const fs = require('fs');

function sanitizeTestFile(path) {
  try {
    let code = fs.readFileSync(path, 'utf-8');

    code = code
      .replace(/```[a-z]*\n?/gi, '')                         
      .replace(/###.*\n?/g, '')                              
      .replace(/Here(?:'s| is).*?(?=#include)/gis, '')        
      .replace(/^\s*\n/gm, '')                            
      .trim();

    fs.writeFileSync(path, code);
    console.log(`${path} sanitized.`);
  } catch (err) {
    console.error(`Failed to sanitize ${path}:`, err.message);
  }
}

module.exports = { sanitizeTestFile };
