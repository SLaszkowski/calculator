import { parseStringToNumber, numberToString  }  from "./validator.js";

export default function calculatorController(buttons, display, logic) {
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
                            const isDivisionByZero = logic.operator === "/" && b === 0;
                            const isNumberValid = a !== null && b !== null;
                            if(!isDivisionByZero && isNumberValid) {
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
                                    const isDivisionByZero = logic.operator === "/" && b === 0;
                                    const isNumberValid = a !== null && b !== null;
                                    if(!isDivisionByZero && isNumberValid) {
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
}