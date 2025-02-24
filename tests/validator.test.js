import Validator from "../src/validator";

const errorData = [
    [10, TypeError, "Invalid input. Expected a valid string, but got: number"],
    [-10, TypeError, "Invalid input. Expected a valid string, but got: number"],
    [4.232, TypeError, "Invalid input. Expected a valid string, but got: number"],
    [Infinity, TypeError, "Invalid input. Expected a valid string, but got: number"],
    [-Infinity, TypeError, "Invalid input. Expected a valid string, but got: number"],
    [null, TypeError, "Invalid input. Expected a valid string, but got: object"],
    [undefined, TypeError, "Invalid input. Expected a valid string, but got: undefined"],
    [NaN, TypeError, "Invalid input. Expected a valid string, but got: number"],
    [[], TypeError, "Invalid input. Expected a valid string, but got: object"],
    [{}, TypeError, "Invalid input. Expected a valid string, but got: object"],
]

const nullData = [
    ["abcd", null],
    ["ajay719", null],
    ["", null]
]

const correctData = [
    ["123sad", 123],
    ["10.5", 10.5],
    ["10", 10],
    ["21.23456342", 21.23456342],
    ["-21.23456342", -21.23456342]
]

describe("Validator.parseStringToNumber", () => {
    describe("returns null", () => {
        test.each(nullData)(
            "when input is %p should return %p",
            (inputValue, expectedResult) => {
            expect(Validator.parseStringToNumber(inputValue)).toBe(expectedResult)
        })
    })

    describe("parses correct values", () => {
        test.each(correctData)(
            "when input is %p should return %p",
            (inputValue, expectedResult) => {
            expect(Validator.parseStringToNumber(inputValue)).toBe(expectedResult)
        })
    })

    describe("throws error with message", () => {
        test.each(errorData)(
            "when input is %p should throw %p with error message %s",
            (inputValue, error, errorMessage) => {
            expect(() => Validator.parseStringToNumber(inputValue)).toThrow(error);
            expect(() => Validator.parseStringToNumber(inputValue)).toThrow(errorMessage);
        })
    })
})