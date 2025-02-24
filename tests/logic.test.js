import Logic from "../src/logic"

const inputData = ["1", "2", "5", "0", "1", "2", "5", "33", "222"];
const operators = ["+", "-", "*", "/"]
const calculateData = [
    [5, "+", 5, 10],
    [-3, "+", 4, 1],
    [36, "+", -32, 4],
    [0, "+", 0, 0],
    [100, "+", 50, 150],
    [0.1, "+", 0.2, 0.3],
    [3.141592653, "+", 2.718281828, 5.859874481],

    [10, "-", 3, 7],
    [-10, "-", 5, -15],
    [100, "-", 50, 50],
    [0, "-", 0, 0],
    [0.1, "-", 0.2, -0.1],
    [3.141592653, "-", 2.718281828, 0.423310825],

    [5, "*", 5, 25],
    [-3, "*", 4, -12],
    [0, "*", 50, 0],
    [2.5, "*", 4, 10],
    [0.123456789, "*", 0.987654321, 0.121932632],

    [10, "/", 2, 5],
    [10, "/", 3, 3.333333333],
    [0, "/", 5, 0],
    [0.123456789, "/", 0.987654321, 0.125],
    [1.23456789, "/", 3.141592653, 0.393221267],

    [5, "+", 5.5, 10.5],
    [-3.5, "+", 4, 0.5],
    [3, "*", 3.14, 9.42],
    [-2.5, "*", 4, -10],
    [100, "/", 3.14, 31.847229259],

    [10, "/", 0, null],
    [-5, "/", 0, null],
    [75, "/", 0, null],

    [0, "*", 123456789, 0],
    [100000000, "*", 0, 0],

    [1.234567891, "+", 0.987654321, 2.222222212],
    [1.234567891, "-", 0.987654321, 0.24691357],
    [1.234567891, "*", 0.987654321, 1.219612967],
    [1.234567891, "/", 0.987654321, 1.25]
];


describe("Logic class", () => {
    let logic;

    beforeEach(() => {
        logic = new Logic();
    })

    describe("appendValue", () => {
        test("should append new string", () => {
            inputData.forEach(input => logic.appendValue(input))
            expect(logic.currentValue).toBe("125012533222");
        })
    })

    describe("storeOperator", () => {
        test.each(operators)("should store operator %p", operator => {
            logic.currentValue = "55";
            logic.storeOperator(operator);
            expect(logic.operator).toBe(operator);
            expect(logic.previousValue).toBe("55");
            expect(logic.currentValue).toBe("");
        })
    })

    describe("calculate", () => {
        test.each(calculateData)("%p %p %p should be equal %p", (a, operator, b, result) => {
            logic.operator = operator;
            logic.calculate(a, b);
            expect(logic.result).toBe(result);
        })
    })
})