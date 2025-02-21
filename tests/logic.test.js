import Logic from "../src/logic"

const inputData = [1, 2, 5, 0, 1, 2, 5, 33, 222];

describe("appendValue", () => {
    let logic;

    beforeEach(() => {
        logic = new Logic();
    })

    test("should append new string", () => {
        inputData.forEach(input => logic.appendValue(input))
        expect(logic.currentValue).toBe("125012533222")
    })
})