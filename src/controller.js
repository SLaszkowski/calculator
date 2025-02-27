import "../icons.js"
import Display from "./display.js";
import Logic from "./logic.js";
import { parseStringToNumber, numberToString  }  from "../src/validator";

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
                break;
            case "operator":
                // Second operator passed
                if(logic.currentValue) {
                    const a = parseStringToNumber(logic.currentValue);
                    const b = parseStringToNumber(logic.previousValue);
                    if(a && b && logic.operator) logic.result = logic.calculate(a, b);
                }
                logic.storeOperator(btnValue);
                break;
            case "action":
                if(btnValue === "clear") logic.reset();
                else if(btnValue === "delete") logic.delete();
                else if(btnValue === "equal") {
                    const a = parseStringToNumber(logic.currentValue);
                    const b = parseStringToNumber(logic.previousValue);
                    if(a && b && logic.operator) logic.result = logic.calculate(a, b);
                }
                break;
            case "dot":
                if(logic.currentValue && !logic.currentValue.includes(".")) logic.appendValue(btnValue);
                break;
        }
    });
});