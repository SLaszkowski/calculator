import Display from "./display.js";
import Logic from "./logic.js";
import { parseStringToNumber, numberToString  }  from "./validator.js";

const buttons = document.querySelectorAll('.btn');
const mainDisplay = document.querySelector(".mainDisplay");
const secondDisplay = document.querySelector(".secondDisplay");

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
                break;
            case "operator":
                // Second operator passed
                if(logic.currentValue && logic.previousValue && logic.operator) {
                    const a = parseStringToNumber(logic.previousValue);
                    const b = parseStringToNumber(logic.currentValue);
                    if(a && b && logic.operator) {
                        logic.calculate(a, b);
                        logic.result = numberToString(logic.result);
                    }
                }
                logic.storeValues();
                logic.storeOperator(btnValue);
                display.updateMainDisplay(logic.previousValue, logic.operator, logic.currentValue);
                break;
            case "action":
                if(btnValue === "clear") {
                    logic.reset();
                    display.clearBothDisplays();
                }
                else if(btnValue === "delete") logic.delete();
                else if(btnValue === "equal") {
                    const a = parseStringToNumber(logic.previousValue);
                    const b = parseStringToNumber(logic.currentValue);
                    if(a && b && logic.operator) {
                        logic.calculate(a, b);
                        logic.result = numberToString(logic.result);
                        logic.storeValues();
                        display.updateMainDisplay(logic.previousValue, logic.operator, logic.currentValue);
                    }
                }
                break;
            case "dot":
                if(logic.currentValue && !logic.currentValue.includes(".")) logic.appendValue(btnValue);
                break;
        }
    });
});