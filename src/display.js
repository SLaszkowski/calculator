
export default class Display {
    constructor(mainDisplay, secondDisplay) {
        this.mainDisplay = mainDisplay;
        this.secondDisplay = secondDisplay;
    }

    updateMainDisplay(previousValue, operator, currentValue) {
        this.mainDisplay.innerText = previousValue + this.showOperatorWithSpaces(operator) + currentValue;
    }

    updateSecondDisplay(previousValue, operator, currentValue) {
        this.secondDisplay.innerText = previousValue + this.showOperatorWithSpaces(operator) + currentValue + " =";
    }

    showOperatorWithSpaces = operator => operator ? ` ${operator} ` : operator;

    clearSecondDisplay() {
        this.secondDisplay.innerText = "";
    }

    clearBothDisplays() {
        this.mainDisplay.innerText = "";
        this.secondDisplay.innerText = "";
    }
}