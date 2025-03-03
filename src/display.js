
export default class Display {
    constructor(mainDisplay, secondDisplay) {
        this.mainDisplay = mainDisplay;
        this.secondDisplay = secondDisplay;
        this.showDefaultZero();
    }

    updateMainDisplay(previousValue, operator, currentValue) {
        if(!previousValue && !operator && !currentValue) this.showDefaultZero();
        else {
            this.mainDisplay.classList.remove("default-zero");
            this.mainDisplay.innerText = previousValue + this.showOperatorWithSpaces(operator) + currentValue;
        }
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
        this.showDefaultZero();
    }

    showDefaultZero() {
        this.mainDisplay.innerText = "0";
        this.mainDisplay.classList.add("default-zero");
    }
}