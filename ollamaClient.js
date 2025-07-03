const axios = require('axios');

function cleanResponse(text) {
  return text
    .replace(/```[a-z]*\n?/gi, '')        
    .replace(/```/g, '')                
    .replace(/^###.*$/gm, '')          
    .trim();
}

async function askOllama(prompt, code) {
  try {
    const res = await axios.post('http://localhost:11434/api/generate', {
      model: 'codellama', 
      prompt: `${prompt}\n\n### Input Code:\n${code}`,
      stream: false
    });

    return cleanResponse(res.data.response);
  } catch (error) {
    console.error("❌ Error connecting to Ollama:", error.message);
    return "// Failed to get response from LLM";
  }
}

module.exports = { askOllama };
