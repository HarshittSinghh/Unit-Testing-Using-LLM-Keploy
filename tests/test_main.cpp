++
#include <gtest/gtest.h>

TEST(AddTest, PositiveNumbers) {
    EXPECT_EQ(add(2, 3), 5);
}

TEST(AddTest, NegativeNumbers) {
    EXPECT_EQ(add(-2, -3), -5);
}

TEST(SubtractTest, PositiveNumbers) {
    EXPECT_EQ(subtract(5, 3), 2);
}

TEST(SubtractTest, NegativeNumbers) {
    EXPECT_EQ(subtract(-5, -3), 2);
}

TEST(MultiplyTest, PositiveNumbers) {
    EXPECT_EQ(multiply(2, 3), 6);
}

TEST(MultiplyTest, NegativeNumbers) {
    EXPECT_EQ(multiply(-2, -3), 6);
}

TEST(DivideTest, PositiveNumbers) {
    EXPECT_EQ(divide(10, 2), 5);
}

TEST(DivideTest, NegativeNumbers) {
    EXPECT_EQ(divide(-10, -2), 5);
}

TEST(DivideTest, DivideByZero) {
    EXPECT_EQ(divide(10, 0), -1);
}

TEST(FactorialTest, PositiveInputs) {
    EXPECT_EQ(factorial(5), 120);
}

TEST(FactorialTest, NegativeInputs) {
    EXPECT_EQ(factorial(-5), -1);
}