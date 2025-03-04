import Display from "../src/display";

const updateMainDisplayData = [
    ["", "", "", "0", true],
    ["", "", "0", "0", false],
    ["45", "", "", "45", false],
    ["23.443", "+", "", "23.443 + ", false],
    ["1", "+", "2", "1 + 2", false],
    ["1", "-", "2", "1 - 2", false],
    ["1", "*", "2", "1 * 2", false],
    ["1", "/", "2", "1 / 2", false],
    ["", "", "2", "2", false],
]

const updateMainDisplayErrorData = [
    ["-", "+", "", TypeError, "Invalid values passed to updateMainDisplay function. Arguments: -, +, "],
    ["1", "", "2", TypeError, "Invalid values passed to updateMainDisplay function. Arguments: 1, , 2"],
    ["", "+", "2", TypeError, "Invalid values passed to updateMainDisplay function. Arguments: , +, 2"],
    ["", "*", "", TypeError, "Invalid values passed to updateMainDisplay function. Arguments: , *, "],
]

const updateSecondDisplayData = [
    ["43", "+", "0.34", "43 + 0.34 ="],
    ["-86", "-", "2.234", "-86 - 2.234 ="],
    ["239.4", "*", "324.7", "239.4 * 324.7 ="],
    ["4356.3", "/", "0.99", "4356.3 / 0.99 ="]
]

const updateSecondDisplayErrorData = [
    ["", "", "", TypeError, "Invalid values passed to updateSecondDisplay function. Arguments: , ,"],
    ["", "+", "2", TypeError, "Invalid values passed to updateSecondDisplay function. Arguments: , +, 2"],
    ["1", "", "2", TypeError, "Invalid values passed to updateSecondDisplay function. Arguments: 1, , 2"],
    ["1", "+", "", TypeError, "Invalid values passed to updateSecondDisplay function. Arguments: 1, +, "],
    ["", "", "2", TypeError, "Invalid values passed to updateSecondDisplay function. Arguments: , , 2"]
];

describe("Display", () => {
    let mainDisplay;
    let secondDisplay;
    let display;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator__second-display"></div>
            <div class="calculator__main-display"></div>
        `;
        mainDisplay = document.querySelector('.calculator__main-display');
        secondDisplay = document.querySelector('.calculator__second-display');
        display = new Display(mainDisplay, secondDisplay);
    });

    describe("updateMainDisplay", () => {
        test("should show default zero", () => {
            display.updateMainDisplay("", "", "");
            expect(mainDisplay.innerText).toBe("0");
            expect(mainDisplay.classList.contains("default-zero")).toBe(true);
        });

        test.each(updateMainDisplayData)("should update main display", (prevValue, operator, currValue, expectInnerText, expectClassState) => {
            display.updateMainDisplay(prevValue, operator, currValue);
            expect(mainDisplay.innerText).toBe(expectInnerText);
            expect(mainDisplay.classList.contains("default-zero")).toBe(expectClassState);
        });

        test.each(updateMainDisplayErrorData)("should throw error for invalid data passed to main display", (prevValue, operator, currValue, errorType, errorMessage) => {
            expect(() => display.updateMainDisplay(prevValue, operator, currValue)).toThrow(errorType);
            expect(() => display.updateMainDisplay(prevValue, operator, currValue)).toThrow(errorMessage);
        });

        test.each(updateSecondDisplayData)("should update second display", (prevValue, operator, currValue, expectInnerText) => {
            display.updateSecondDisplay(prevValue, operator, currValue);
            expect(secondDisplay.innerText).toBe(expectInnerText);
        });

        test.each(updateSecondDisplayErrorData)("should throw error for invalid data passed to second display", (prevValue, operator, currValue, errorType, errorMessage) => {
            expect(() => display.updateSecondDisplay(prevValue, operator, currValue)).toThrow(errorType);
            expect(() => display.updateSecondDisplay(prevValue, operator, currValue)).toThrow(errorMessage);
        });

        test("showOperatorWithSpaces should return operator with spaces", () => {
            expect(display.showOperatorWithSpaces("+")).toBe(" + ");
            expect(display.showOperatorWithSpaces("-")).toBe(" - ");
            expect(display.showOperatorWithSpaces("*")).toBe(" * ");
            expect(display.showOperatorWithSpaces("/")).toBe(" / ");
        });

        test("clearSecondDisplay should clear second display", () => {
            display.updateSecondDisplay("4324.32", "+", "2.2234");
            display.clearSecondDisplay();
            expect(secondDisplay.innerText).toBe("");
        });

        test("clearBothDisplays should clear both displays", () => {
            display.updateMainDisplay("-777.5", "+", "233");
            display.clearBothDisplays();
            expect(mainDisplay.innerText).toBe("0");
            expect(secondDisplay.innerText).toBe("");
            expect(mainDisplay.classList.contains("default-zero")).toBe(true);
        });

        test("showDefaultZero should show default zero", () => {
            display.showDefaultZero();
            expect(mainDisplay.innerText).toBe("0");
            expect(mainDisplay.classList.contains("default-zero")).toBe(true);
        })
    });
});


