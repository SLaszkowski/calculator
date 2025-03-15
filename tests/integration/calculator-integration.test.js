import calculatorController from "../../src/controller";
import Display from "../../src/display";
import Logic from "../../src/logic";
import { fireEvent } from "@testing-library/dom";

// Used rest operator to click buttons consecutively
function clickButtonsbyDataValue(...btnValue) {
    btnValue.forEach((btnValue) => fireEvent.click(document.querySelector(`[data-value="${btnValue}"]`)))
}

const testData = [
    ["3", "+", "1", "3 + 1 =", "4"],
    ["9", "-", "7", "9 - 7 =", "2"],
    ["2", "*", "5", "2 * 5 =", "10"],
    ["4", "/", "2", "4 / 2 =", "2"]
];

const operators = ["+", "*", "/", "-"];

describe("calculator integration tests", () => {
    let mainDisplay, secondDisplay, buttons, display, logic;
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator__second-display"></div>
            <div class="calculator__main-display"></div>
            <button class="calculator__btn" data-type="number" data-value="1">1</button>
            <button class="calculator__btn" data-type="number" data-value="2">2</button>
            <button class="calculator__btn" data-type="number" data-value="3">3</button>
            <button class="calculator__btn" data-type="number" data-value="4">4</button>
            <button class="calculator__btn" data-type="number" data-value="5">5</button>
            <button class="calculator__btn" data-type="number" data-value="6">6</button>
            <button class="calculator__btn" data-type="number" data-value="7">7</button>
            <button class="calculator__btn" data-type="number" data-value="8">8</button>
            <button class="calculator__btn" data-type="number" data-value="9">9</button>
            <button class="calculator__btn" data-type="action" data-value="clear"></button>
            <button class="calculator__btn" data-type="action" data-value="delete"></button>
            <button class="calculator__btn" data-type="action" data-value="equal"></button>
            <button class="calculator__btn" data-type="operator" data-value="/"></button>
            <button class="calculator__btn" data-type="operator" data-value="+"></button>
            <button class="calculator__btn" data-type="operator" data-value="*"></button>
            <button class="calculator__btn" data-type="operator" data-value="-"></button>
            <button class="calculator__btn" data-type="dot" data-value=".">.</button>
        `
        mainDisplay = document.querySelector(".calculator__main-display");
        secondDisplay = document.querySelector(".calculator__second-display");
        buttons = document.querySelectorAll(".calculator__btn");
        display = new Display(mainDisplay, secondDisplay);
        logic = new Logic();

        calculatorController(buttons, display, logic);
    })

    describe("number", () => {
        const testDataNumber = [
            ["3", "1", "31"],
            ["8", "2", "82"],
            ["5", "9", "59"]
        ];
        test.each(testDataNumber)("should show pressed number", (num1, num2, result ) => {
            clickButtonsbyDataValue(num1, num2);
            expect(display.mainDisplay.innerText).toBe(result);
            expect(display.secondDisplay.innerText).toBe("");
        })
    })

    describe("operator", () => {
        test.each(testData)("should show or change operator after number", (button, operator) => {
            clickButtonsbyDataValue(button, operator);
            expect(logic.operator).toBe(operator);
            expect(display.mainDisplay.innerText).toBe(`${button} ${operator} `);
            expect(display.secondDisplay.innerText).toBe("");
            clickButtonsbyDataValue("clear");
        })

        test("should not store operator after minus", () => {
            clickButtonsbyDataValue("-");
            operators.forEach(operator => {
                clickButtonsbyDataValue(operator);
                expect(logic.operator).toBe("");
                expect(display.mainDisplay.innerText).toBe("-");
                expect(display.secondDisplay.innerText).toBe("");
            })
        })

        test("should not store and show operator as first value except to minus", () => {
            operators.forEach(operator => {
                if(operator === "-") {
                    clickButtonsbyDataValue(operator)
                    expect(logic.operator).toBe("");
                    expect(display.mainDisplay.innerText).toBe("-");
                    expect(display.secondDisplay.innerText).toBe("");
                } else {
                    clickButtonsbyDataValue(operator);
                    expect(logic.operator).toBe("");
                    expect(display.mainDisplay.innerText).toBe("0");
                    expect(display.secondDisplay.innerText).toBe("");
                }
            });
        })

        test("should store operator and calculate result when second operator pressed", () => {
            logic.previousValue = "75";
            logic.operator = "-";
            logic.currentValue = "32";
            clickButtonsbyDataValue("*");
            expect(logic.operator).toBe("*");
            expect(display.mainDisplay.innerText).toBe("43 * ")
            expect(display.secondDisplay.innerText).toBe("")
        })


    })

    describe("action", () => {
        describe("clear", () => {
            test("should clear displays, show default value and reset logic values", () => {
                const buttonsToClick = [
                    ["5"], ["2", "+"], ["1", "*", "6"], ["1", "*", "6", "equal"]
                ]
                buttonsToClick.forEach(button => {
                    clickButtonsbyDataValue(...button);
                    clickButtonsbyDataValue("clear");
                    expect(logic.currentValue).toBe("");
                    expect(logic.previousValue).toBe("");
                    expect(logic.operator).toBe("");
                    expect(logic.result).toBe(null);
                    expect(display.mainDisplay.innerText).toBe("0");
                    expect(display.secondDisplay.innerText).toBe("");
                })

            })
        })
        test.each(testData)("should calculate result correctly and show in both displays", (button1, button2, button3, expectSecondDisplay, expectMainDisplay) => {
            clickButtonsbyDataValue(button1, button2, button3, "equal");
            expect(display.secondDisplay.innerText).toBe(expectSecondDisplay)
            expect(display.mainDisplay.innerText).toBe(expectMainDisplay)
            clickButtonsbyDataValue("clear");
        })
    })

})