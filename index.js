const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { askOllama } = require('./ollamaClient');
const { sanitizeTestFile } = require('./utils');

function read(file) {
  try {
    if (!fs.existsSync(file)) return '';
    return fs.readFileSync(file, 'utf-8');
  } catch {
    return '';
  }
}

function write(file, data) {
  try {
    fs.writeFileSync(file, data);
    console.log(`✅ Written: ${file}`);
  } catch {}
}

async function generateTests() {
  const cppCode = read('cpp_project/main.cpp');
  const prompt = read('prompts/generate_tests.yaml');
  const result = await askOllama(prompt, cppCode);
  write('tests/test_main.cpp', result);
  sanitizeTestFile('tests/test_main.cpp');
  console.log("🧪 Initial tests generated.");
}

async function refineTests() {
  const tests = read('tests/test_main.cpp');
  const prompt = read('prompts/refine_tests.yaml');
  const result = await askOllama(prompt, tests);
  write('tests/test_main.cpp', result);
  sanitizeTestFile('tests/test_main.cpp');
  console.log("🔁 Tests refined.");
}

function buildProject() {
  try {
    execSync('wsl g++ -fprofile-arcs -ftest-coverage -std=c++17 /mnt/c/Users/KIIT/Desktop/Assignment-5/cpp_project/main.cpp /mnt/c/Users/KIIT/Desktop/Assignment-5/tests/test_main.cpp -lgtest -lgtest_main -pthread -o /mnt/c/Users/KIIT/Desktop/Assignment-5/test_runner', {
      stdio: 'inherit'
    });
    console.log("✅ Build succeeded.");
    return true;
  } catch (err) {
    console.log("❌ Build failed.");
    return err;
  }
}

async function fixBuildIfFailed(err) {
  const logs = err?.stderr?.toString() || 'No logs available.';
  const brokenCode = read('tests/test_main.cpp');
  const prompt = read('prompts/build_fix.yaml');
  const result = await askOllama(prompt, `${brokenCode}\n\n[Build Logs]\n${logs}`);
  write('tests/test_main.cpp', result);
  sanitizeTestFile('tests/test_main.cpp');
  console.log("🔧 Build errors attempted to be fixed.");
}

function runTestsAndCoverage() {
  try {
    execSync('wsl ./test_runner', { stdio: 'inherit' });
    execSync('wsl lcov --capture --directory . --output-file coverage.info');
    execSync('wsl lcov --remove coverage.info "/usr/*" "*/gtest/*" -o cleaned.info');
    const summary = execSync('wsl lcov --summary cleaned.info').toString();
    fs.writeFileSync('report.md', `# Test Coverage Report\n\n\`\`\`\n${summary}\n\`\`\``);
    console.log("📊 Coverage report generated.");
    console.log("📄 Summary:\n", summary);
    return summary;
  } catch {
    return '';
  }
}

async function improveCoverage() {
  const cov = read('cleaned.info') || read('coverage.info');
  const prompt = read('prompts/improve_coverage.yaml');
  const updatedTests = await askOllama(prompt, cov);
  write('tests/test_main.cpp', updatedTests);
  sanitizeTestFile('tests/test_main.cpp');
  console.log("📈 Test coverage improved.");
}

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
