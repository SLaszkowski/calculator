import { splitByOperator, operators, countResult } from "../calculatorScript.js"


test("Should split string by operator", () => {
    operators.forEach(operator => {
        let arg = "5" + operator + "0";
        expect(splitByOperator(arg)).toStrictEqual([5, 0]);
    })
})

test("Should return result of math operation", () => {
    expect(countResult("5+5")).toStrictEqual("10");
    expect(countResult("5-5")).toStrictEqual("0");
    expect(countResult("5/5")).toStrictEqual("1");
    expect(countResult("5*5")).toStrictEqual("25");
})