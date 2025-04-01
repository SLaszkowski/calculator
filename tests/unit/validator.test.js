import { parseStringToNumber, numberToString  }  from "../../src/validator";

const parseStringToNumberData = [
    ["abcd", null],
    ["ajay719", null],
    ["", null],
    [10, null],
    [-10, null],
    [4.232, null],
    [Infinity, null],
    [-Infinity, null],
    [null, null],
    [undefined, null],
    [NaN, null],
    [[], null],
    [{}, null],
    ["123sad", null],
    ["-0", null],
    ["-0.0", null],
    ["10.5", 10.5],
    ["10", 10],
    ["21.23456342", 21.23456342],
    ["-21.23456342", -21.23456342],
    ["0", 0],
    ["0.0", 0],
    [" 123 ", 123],
    [" 10.5 ", 10.5],
    [" 10 ", 10],
    [" 21.23456342 ", 21.23456342],
    [" -21.23456342 ", -21.23456342],
    ["0.2300", 0.23],
    ["  0.2300 ", 0.23],
    ["-0.2300", -0.23],
    ["12.590", 12.59],
    ["-12.590", -12.59],
    ["0.0000001", 0.0000001],
    ["-0.0000001", -0.0000001]
]

const numberToStringData = [
    [123, "123"],
    [10.5, "10.5"],
    [10, "10"],
    [21.23456342, "21.23456342"],
    [-21.23456342, "-21.23456342"],
    [0, "0"],
    [0.0, "0"],
    [12.590, "12.59"],
    [-12.590, "-12.59"],
    [0.2300, "0.23"],
    [Infinity, ""],
    [-Infinity, ""],
    [NaN, ""],
    [null, ""],
    [undefined, ""],
    [[], ""],
    [{}, ""]
]

describe("parseStringToNumber", () => {
    test.each(parseStringToNumberData)(
        "when input is %p should return %p",
        (inputValue, expectedResult) => {
        expect(parseStringToNumber(inputValue)).toBe(expectedResult);
    })
});

describe("numberToString", () => {
    test.each(numberToStringData)(
        "when input is %p should return %p",
        (inputValue, expectedResult) => {
        expect(numberToString(inputValue)).toBe(expectedResult);
    })
});