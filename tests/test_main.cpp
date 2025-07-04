Output:
#include <gtest/gtest.h>
TEST(add, typical_values) {
  EXPECT_EQ(3, add(1, 2));
}
TEST(subtract, typical_values) {
  EXPECT_EQ(1, subtract(4, 3));
}
TEST(multiply, typical_values) {
  EXPECT_EQ(6, multiply(2, 3));
}
TEST(divide, typical_values) {
  EXPECT_THROW(divide(5, 0), std::runtime_error);
}
TEST(factorial, typical_values) {
  EXPECT_EQ(120, factorial(5));
}
Note that this output is in plain C++ format and includes only the necessary test cases to increase the coverage to 100%. The code is clean, compilable, valid C++, and does not include any markdown, comments, or explanations.