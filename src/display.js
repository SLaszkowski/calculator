
export default class Display {
    constructor(mainDisplay, secondDisplay) {
        this.mainDisplay = mainDisplay;
        this.secondDisplay = secondDisplay;
    }

    updateMainDisplay(value) {
        this.mainDisplay.innerText += value;
    }

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