const fs = require('fs');
const { execSync } = require('child_process');
const { askOllama } = require('./ollamaClient');
const { sanitizeTestFile } = require('./utils'); // Import sanitize utility

// Helper to read file content
function read(file) {
  try {
    if (!fs.existsSync(file)) {
      console.error(`❌ File not found: ${file}`);
      return '';
    }
    return fs.readFileSync(file, 'utf-8');
  } catch (e) {
    console.error(`❌ Failed to read ${file}:`, e.message);
    return '';
  }
}

// Helper to write file content
function write(file, data) {
  try {
    fs.writeFileSync(file, data);
    console.log(`✅ Written: ${file}`);
  } catch (e) {
    console.error(`❌ Failed to write ${file}:`, e.message);
  }
}

// Generate initial tests using LLM
async function generateTests() {
  const cppCode = read('cpp_project/main.cpp');
  const prompt = read('prompts/generate_tests.yaml');
  const result = await askOllama(prompt, cppCode);
  write('tests/test_main.cpp', result);
  sanitizeTestFile('tests/test_main.cpp'); // Clean file after generation
  console.log("🧪 Initial tests generated.");
}

// Refine tests using LLM
async function refineTests() {
  const tests = read('tests/test_main.cpp');
  const prompt = read('prompts/refine_tests.yaml');
  const result = await askOllama(prompt, tests);
  write('tests/test_main.cpp', result);
  sanitizeTestFile('tests/test_main.cpp'); // Clean after refinement
  console.log("🔁 Tests refined.");
}

// Build the test project
function buildProject() {
  try {
    execSync('g++ -fprofile-arcs -ftest-coverage -std=c++17 cpp_project/main.cpp tests/test_main.cpp -lgtest -lgtest_main -pthread -o test_runner', {
      stdio: 'inherit'
    });
    console.log("✅ Build succeeded.");
    return true;
  } catch (err) {
    console.log("❌ Build failed.");
    return err;
  }
}

// Fix test file based on build logs using LLM
async function fixBuildIfFailed(err) {
  const logs = err?.stderr?.toString() || 'No logs available.';
  const brokenCode = read('tests/test_main.cpp');
  const prompt = read('prompts/build_fix.yaml');
  const result = await askOllama(prompt, `${brokenCode}\n\n[Build Logs]\n${logs}`);
  write('tests/test_main.cpp', result);
  sanitizeTestFile('tests/test_main.cpp'); // Clean before retrying
  console.log("🔧 Build errors attempted to be fixed.");
}

// Run tests and collect coverage
function runTestsAndCoverage() {
  try {
    execSync('./test_runner', { stdio: 'inherit' });

    execSync('lcov --capture --directory . --output-file coverage.info');
    execSync('lcov --remove coverage.info "/usr/*" "*/gtest/*" -o cleaned.info');

    const summary = execSync('lcov --summary cleaned.info').toString();
    fs.writeFileSync('report.md', `# Test Coverage Report\n\n\`\`\`\n${summary}\n\`\`\``);

    console.log("📊 Coverage report generated.");
    console.log("📄 Summary:\n", summary);
    return summary;
  } catch (e) {
    console.error("❌ Error while running tests or generating coverage:", e.message);
    return '';
  }
}

// Ask LLM to improve coverage further
async function improveCoverage() {
  const cov = read('cleaned.info') || read('coverage.info');
  const prompt = read('prompts/improve_coverage.yaml');
  const updatedTests = await askOllama(prompt, cov);
  write('tests/test_main.cpp', updatedTests);
  sanitizeTestFile('tests/test_main.cpp');
  console.log("📈 Test coverage improved.");
}

// 🏁 MAIN FLOW
(async () => {
  await generateTests();
  await refineTests();

  let buildResult = buildProject();
  if (buildResult !== true) {
    await fixBuildIfFailed(buildResult);
    buildResult = buildProject();
    if (buildResult !== true) {
      console.log("❌ Build failed again. Exiting.");
      return;
    }
  }

  runTestsAndCoverage();
  await improveCoverage();
})();
