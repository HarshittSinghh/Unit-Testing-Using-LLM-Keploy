const fs = require('fs');

function sanitizeTestFile(path) {
  let content = fs.readFileSync(path, 'utf-8');
  content = content
    .replace(/```[a-z]*\n?/gi, '') 
    .replace(/```/g, '')
    .replace(/^Here's.*\n?/gi, '') 
    .replace(/^###.*\n?/gi, '')  
    .replace(/^Output.*\n?/gi, '')
    .trim();

  fs.writeFileSync(path, content);
  console.log("✅ test_main.cpp sanitized.");
}

module.exports = {
  sanitizeTestFile,
};