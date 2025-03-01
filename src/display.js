
export default class Display {
    constructor(mainDisplay, secondDisplay) {
        this.mainDisplay = mainDisplay;
        this.secondDisplay = secondDisplay;
    }

    updateMainDisplay(previousValue, operator, currentValue) {
        this.mainDisplay.innerText = previousValue + this.showOperator(operator) + currentValue;
    }

    showOperator = operator => operator ? ` ${operator} ` : operator;

    updateSecondDisplay(value) {
        this.mainDisplay.innerText += value;
    }

    clearMainDisplay() {
        this.mainDisplay.innerText = "";
    }

    clearSecondDisplay() {
        this.secondDisplay.innerText = "";
    }

    clearBothDisplays() {
        this.mainDisplay.innerText = "";
        this.secondDisplay.innerText = "";
    }

    showOperationInSecondDisplay(operation) {
        this.secondDisplay.innerText = operation;
    }

    showResultInMainDisplay(result) {
        this.mainDisplay.innerText = result;
    }
}