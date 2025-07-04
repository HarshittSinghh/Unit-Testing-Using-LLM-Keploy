#include <stdexcept>

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

int divide(int a, int b) {
    if (b == 0) {
        throw std::runtime_error("Division by zero");
    }
    return a / b;
}

int factorial(int n) {
    if (n < 0) {
        throw std::domain_error("Negative input for factorial");
    }
    if (n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}
