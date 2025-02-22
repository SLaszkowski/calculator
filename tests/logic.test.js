import Logic from "../src/logic"

const inputData = ["1", "2", "5", "0", "1", "2", "5", "33", "222"];
const operators = ["+", "-", "*", "/"]


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
})