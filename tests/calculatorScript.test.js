import { splitByOperator } from "../calculatorScript.js"

const operators = []

test("Should split string by operator", () => {
    expect(splitByOperator("5+1")).toStrictEqual([5, 1]);
    expect(splitByOperator("5-1")).toStrictEqual([5, 1]);
    expect(splitByOperator("5*1")).toStrictEqual([5, 1]);
    expect(splitByOperator("5/1")).toStrictEqual([5, 1]);
})

