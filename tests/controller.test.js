import Display from "../src/display.js";
import Logic from "../src/logic.js";
import "../src/controller.js";
import { parseStringToNumber, numberToString  }  from "../src/validator.js";

jest.mock("../src/logic.js");
jest.mock("../src/display.js");
jest.mock("../src/validator.js");

describe("controller", () => {
    let mainDisplay, secondDisplay, buttons, display, logic;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator__second-display"></div>
            <div class="calculator__main-display"></div>
            <button class="calculator__btn" data-type="number" data-value="6">6</button>
            <button class="calculator__btn" data-type="action" data-value="clear"></button>
            <button class="calculator__btn" data-type="action" data-value="delete"></button>
            <button class="calculator__btn" data-type="action" data-value="equal"></button>
            <button class="calculator__btn" data-type="operator" data-value="/"></button>
            <button class="calculator__btn" data-type="operator" data-value="+"></button>
            <button class="calculator__btn" data-type="operator" data-value="*"></button>
            <button class="calculator__btn" data-type="operator" data-value="-"></button>
            <button class="calculator__btn" data-type="dot" data-value=".">.</button>`

        mainDisplay = document.querySelector(".calculator__main-display");
        secondDisplay = document.querySelector(".calculator__second-display");
        buttons = document.querySelectorAll(".calculator__btn");

        display = new Display(mainDisplay, secondDisplay);
        logic = new Logic();

        // mock validator
        parseStringToNumber.mockImplementation(string => parseFloat(string));
        numberToString.mockImplementation(number => number.toString());

        // mock logic
        logic.calculateResult.mockImplementation((a, b) => logic.result = a + b);
        logic.storeOperator.mockImplementation(operator => logic.operator = operator);
        logic.storeResultAsCurrValue.mockImplementation(result => {
            if(result) {
                logic.currentValue = result;
                logic.previousValue = "";
                logic.result = null;
            }

        display.appendValue.mockImplementation(value => logic.currentValue += value);
    });

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const btnValue = event.target.getAttribute("data-value");
            const btnType = event.target.getAttribute("data-type");
            try {
                switch(btnType) {
                    case "number":
                        logic.appendValue(btnValue);
                        display.updateMainDisplay(logic.previousValue, logic.operator, logic.currentValue);
                        display.clearSecondDisplay();
                        break;
                    case "operator":
                        // Second operator passed
                        if(logic.currentValue && logic.previousValue && logic.operator) {
                            const a = parseStringToNumber(logic.previousValue);
                            const b = parseStringToNumber(logic.currentValue);
                            if(a && b) {
                                logic.calculateResult(a, b);
                                logic.result = numberToString(logic.result);
                                logic.storeResultAsCurrValue(logic.result);
                            }
                        }
                        logic.storeOperator(btnValue);
                        display.updateMainDisplay(logic.previousValue, logic.operator, logic.currentValue);
                        display.clearSecondDisplay();
                        break;
                    case "action":
                        switch(btnValue) {
                            case "clear":
                                logic.reset();
                                display.clearBothDisplays();
                                break;
                            case "delete":
                                logic.delete();
                                display.updateMainDisplay(logic.previousValue, logic.operator, logic.currentValue);
                                display.clearSecondDisplay();
                                break;
                            case "equal":
                                if(logic.currentValue && logic.previousValue && logic.operator) {
                                    const a = parseStringToNumber(logic.previousValue);
                                    const b = parseStringToNumber(logic.currentValue);
                                    if(a && b) {
                                        display.updateSecondDisplay(logic.previousValue, logic.operator, logic.currentValue);
                                        logic.calculateResult(a, b);
                                        logic.result = numberToString(logic.result);
                                        logic.storeResultAsCurrValue(logic.result);
                                        display.updateMainDisplay("", "", logic.currentValue);
                                    }
                                }
                                break;
                            }
                        break;
                    case "dot":
                        if(logic.currentValue && !logic.currentValue.includes(".") && logic.currentValue !== "-") {
                            logic.appendValue(btnValue);
                            display.updateMainDisplay(logic.previousValue, logic.operator, logic.currentValue);
                            display.clearSecondDisplay();
                        }
                        break;
                }

            } catch(error) {
                console.error(error);
            }
        });
    });

    });

    test("should call Display constructor", () => {
        expect(Display).toHaveBeenCalledWith(mainDisplay, secondDisplay);
    });

    test("should call Logic constructor", () => {
        expect(Logic).toHaveBeenCalled();
    });

    describe("number button", () => {
        test("should call functions when number button clicked", () => {
            buttons[0].click();
            expect(logic.appendValue).toHaveBeenCalled();
            expect(display.updateMainDisplay).toHaveBeenCalled();
            expect(display.clearSecondDisplay).toHaveBeenCalled();
        });
    });

    describe("operator button", () => {
        test("should call functions when operator button clicked", () => {
            buttons[4].click();
            expect(logic.storeOperator).toHaveBeenCalled();
            expect(display.updateMainDisplay).toHaveBeenCalled();
            expect(display.clearSecondDisplay).toHaveBeenCalled();
        });

        test("should call functions when second operator clicked", () => {
            logic.currentValue = "5";
            logic.previousValue = "3";
            logic.operator = "+";
            buttons[4].click();
            expect(parseStringToNumber).toHaveBeenCalledWith("5");
            expect(parseStringToNumber).toHaveBeenCalledWith("3");
            expect(logic.calculateResult).toHaveBeenCalledWith(3, 5);
            expect(numberToString).toHaveBeenCalledWith(8);
            expect(logic.storeResultAsCurrValue).toHaveBeenCalledWith("8");
            expect(logic.storeOperator).toHaveBeenCalledWith("/");
            expect(display.updateMainDisplay).toHaveBeenCalledWith("", "/", "8");
            expect(display.clearSecondDisplay).toHaveBeenCalled();
        });

        test("should not call functions when no previous value", () => {
            logic.currentValue = "5";
            logic.operator = "+";
            logic.previousValue = "";
            buttons[4].click();
            expect(parseStringToNumber).not.toHaveBeenCalled();
            expect(logic.calculateResult).not.toHaveBeenCalled();
            expect(numberToString).not.toHaveBeenCalled();
            expect(logic.storeResultAsCurrValue).not.toHaveBeenCalled();
            expect(display.updateMainDisplay).not.toHaveBeenCalled();
            expect(display.clearSecondDisplay).not.toHaveBeenCalled();
        });
    });


    describe("action buttons", () => {
        test("should call functions when clear button clicked", () => {
            buttons[1].click();
            expect(logic.reset).toHaveBeenCalled();
            expect(display.clearBothDisplays).toHaveBeenCalled();
        });

        test("should call functions when delete button clicked", () => {
            buttons[2].click();
            expect(logic.delete).toHaveBeenCalled();
            expect(display.updateMainDisplay).toHaveBeenCalled();
            expect(display.clearSecondDisplay).toHaveBeenCalled();
        });

        test("should call functions when equal button clicked", () => {
            logic.currentValue = "5";
            logic.previousValue = "3";
            logic.operator = "+";
            buttons[3].click();
            expect(parseStringToNumber).toHaveBeenCalledWith("5");
            expect(parseStringToNumber).toHaveBeenCalledWith("3");
            expect(display.updateSecondDisplay).toHaveBeenCalledWith("3", "+", "5");
            expect(logic.calculateResult).toHaveBeenCalledWith(3, 5);
            expect(numberToString).toHaveBeenCalledWith(8);
            expect(logic.storeResultAsCurrValue).toHaveBeenCalledWith("8");
            expect(display.updateMainDisplay).toHaveBeenCalledWith("", "", "8");
        });

        test("should not call functions without data when equal button clicked", () => {
            buttons[3].click();
            expect(parseStringToNumber).not.toHaveBeenCalled();
            expect(display.updateSecondDisplay).not.toHaveBeenCalled();
            expect(logic.calculateResult).not.toHaveBeenCalled();
            expect(numberToString).not.toHaveBeenCalled();
            expect(logic.storeResultAsCurrValue).not.toHaveBeenCalled();
            expect(display.updateMainDisplay).not.toHaveBeenCalled();
        });
    });


    describe("dot button", () => {
        test("should call functions when dot button clicked", () => {
            logic.previousValue = "";
            logic.currentValue = "5";
            logic.operator = "";
            buttons[8].click();
            expect(logic.appendValue).toHaveBeenCalledWith(".");
            expect(display.updateMainDisplay).toHaveBeenCalledWith("", "", "5.");
            expect(display.clearSecondDisplay).toHaveBeenCalled();
        });

        test("should not call functions when no current value", () => {
            logic.currentValue = "";
            buttons[8].click();
            expect(logic.appendValue).not.toHaveBeenCalled();
            expect(display.updateMainDisplay).not.toHaveBeenCalled();
            expect(display.clearSecondDisplay).not.toHaveBeenCalled();
        });

        test("should not call functions when dot exist", () => {
            logic.currentValue = "5.";
            buttons[8].click();
            expect(logic.appendValue).not.toHaveBeenCalled();
            expect(display.updateMainDisplay).not.toHaveBeenCalled();
            expect(display.clearSecondDisplay).not.toHaveBeenCalled();
        });

        test("should not call functions when minus exists", () => {
            logic.currentValue = "-";
            buttons[8].click();
            expect(logic.appendValue).not.toHaveBeenCalledWith("-");
            expect(display.updateMainDisplay).not.toHaveBeenCalled();
            expect(display.clearSecondDisplay).not.toHaveBeenCalled();
        });
    });
});