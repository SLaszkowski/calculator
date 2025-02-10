import { splitByOperator, operators, countResult } from "../calculatorScript.js"

describe("splitByOperator function", () => {
    test("should split string by operator", () => {
        operators.forEach(operator => {
            let arg = `5${operator}0`;
            expect(splitByOperator(arg)).toStrictEqual([5, 0]);
        })
    });
});

describe("countResult function", () => {
    test("should return null for all cases of division by zero", () => {
        expect(countResult("5/0")).toBeNull();
        expect(countResult("-1/0")).toBeNull();
        expect(countResult("0/0")).toBeNull();
        expect(countResult("1.5/0")).toBeNull();
        expect(countResult("100/-0")).toBeNull();
    });
});