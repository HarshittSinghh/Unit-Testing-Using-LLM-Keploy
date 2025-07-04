# 🧪 Assignment-5: C++ Unit Testing with Google Test and Ollama CodeLlama

This project demonstrates how to write and improve unit tests for C++ source files using the **Google Test** framework, enhanced by **Ollama's CodeLlama** model for generating, refining, and improving test coverage automatically.

---

## 🚀 Features

- ✅ Unit testing using **Google Test (gtest)**
- 🤖 Test generation & improvement using **Ollama CodeLlama**
- 🛠️ Modular prompt system for build fixing, test generation, and coverage improvement
- 📁 Structured and maintainable project setup
- 🔄 Automated workflows powered by **Node.js**

---

## 🧱 Tech Stack

- **C++** for making basic Calculator Application
- **Google Test (gtest)** for unit testing
- **Node.js** for orchestrating prompts with Ollama
- **Ollama + CodeLlama** for AI-powered code generation

---
## 📁 Project Structure
```
Assignment-5/
├── cpp_projects/
│   └── main.cpp       
├── prompts/
│   ├── build_fix.yaml
│   ├── generate_tests.yaml
│   ├── improve_coverage.yaml
│   └── refine_tests.yaml
├── tests/
│   └── test_main.cpp        
├── index.js
├── ollamaClient.js
├── utils.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 📦 How to Run

### 🛠️ Prerequisites

- C++ Compiler (g++, clang++)
- Google Test (`libgtest-dev` installed)
- Node.js + npm
- Ollama CLI with **CodeLlama** model downloaded locally

### 🔧 Build C++ Code & Run Tests

#### Run this in WSL or Ubantu Terminal.
```bash
cd Assignment-5
g++ -fprofile-arcs -ftest-coverage -std=c++17 cpp_project/main.cpp tests/test_main.cpp -lgtest -lgtest_main -pthread -o test_runner
./test_runner
```

#### Run a Prompt with Ollama
``` bash
cd Assignment-5
npm init -y
npm install axios
node index.js prompts/generate_tests.yaml
```

#### Author: Harshit Kumar Singh




