import math from "../src/mathModule.js"

describe("mathModule", () => {
    describe("add()", () => {
        test("add two positive numbers", () => {
            expect(math.add(3, 1)).toBe(4);
        })
        test("add two negative numbers", () => {
            expect(math.add(-6, -3)).toBe(-9);
        })
        test("add positive and negative numbers", () => {
            expect(math.add(7, -4)).toBe(3);
        })
        test("add negative and positive numbers", () => {
            expect(math.add(-1, 5)).toBe(4);
        })
        test("handles boundary values", () => {
            expect(math.add(0, 0)).toBe(0);
        })
    })
})