#include <gtest/gtest.h>
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
int divide(int a, int b);
int factorial(int n);
TEST(AddTest, TypicalValues) {
    EXPECT_EQ(add(2, 3), 5);
}
TEST(SubtractTest, TypicalValues) {
    EXPECT_EQ(subtract(4, 2), 2);
}
TEST(MultiplyTest, TypicalValues) {
    EXPECT_EQ(multiply(3, 4), 12);
}
TEST(DivideTest, TypicalValues) {
    EXPECT_EQ(divide(8, 2), 4);
}
TEST(FactorialTest, TypicalValues) {
    EXPECT_EQ(factorial(5), 120);
}
int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
