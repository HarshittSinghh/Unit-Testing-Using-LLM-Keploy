Output:
#include <gtest/gtest.h>
TEST(ArithmeticTests, Addition) {
  EXPECT_EQ(add(3, 5), 8);
}
TEST(ArithmeticTests, Subtraction) {
  EXPECT_EQ(subtract(6, 2), 4);
}
TEST(ArithmeticTests, Multiplication) {
  EXPECT_EQ(multiply(3, 5), 15);
}
TEST(ArithmeticTests, Division) {
  EXPECT_EQ(divide(18, 2), 9);
}
TEST(ArithmeticTests, Factorial) {
  EXPECT_EQ(factorial(5), 120);
}
int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}