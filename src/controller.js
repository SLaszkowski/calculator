import Display from "./display.js";
import Logic from "./logic.js";
import { parseStringToNumber, numberToString  }  from "./validator.js";

const buttons = document.querySelectorAll('.calculator__btn');
const mainDisplay = document.querySelector(".calculator__main-display");
const secondDisplay = document.querySelector(".calculator__second-display");

const display = new Display(mainDisplay, secondDisplay);
const logic = new Logic();


buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const btnValue = event.target.getAttribute("data-value");
        const btnType = event.target.getAttribute("data-type");
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
    });
});