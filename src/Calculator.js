import Decimal from 'decimal.js';
import '../icons.js';


export default class Calculator {
    constructor(mainDisplay, secondDisplay, buttons) {
        this.btn = buttons;
        this.mainDisplay = mainDisplay;
        this.secondDisplay = secondDisplay;

        this.valueIsAnswer = false;
        this.regOperators = /([+\-*/])/g;
        this.regSpaces = /\s+/g;

        this.operators = ["+", "-", "*", "/"];
        this.notification = "Cannot divide by zero";
    }

    resetSecondDisplay() {
        this.secondDisplay.innerText = "";
    }

    splitByOperator(inputText) {
        return inputText.split(inputText.match(/[+\-*/]/)[0]).map(Number);
    }

    updateDisplay(btnValue, btnType) {
        const inputText = {
            value: this.mainDisplay.innerText,
            lastChar: this.mainDisplay.innerText.charAt(this.mainDisplay.innerText.length - 1),
            notificationVisible: () => inputText.value === this.notification,
            removeSpaces: () => inputText.value.replace(this.regSpaces, ""),
            notZero: () => inputText.value !== "0",
            includesNumber: () => /\d+$/.test(inputText.value),
            includesOperator: () => /[+\-*/]/.test(inputText.value),
            replaceOperator: () => inputText.value.replace(/.$/, btnValue),
            addSpacesBetweenOperator: () => inputText.value.replace(this.regOperators, " $1 "),
            resetDisplay: () => (inputText.value = "0")
        };

        if (inputText.notificationVisible()) inputText.resetDisplay();
        inputText.removeSpaces();

        switch (btnType) {
            case "number":
                inputText.notZero()
                    ? this.valueIsAnswer && inputText.lastChar !== "."
                        ? (inputText.value = btnValue)
                        : (inputText.value += btnValue)
                    : (inputText.value = btnValue);
                this.valueIsAnswer = false;
                this.resetSecondDisplay();
                break;
            case "operator":
                if (inputText.notZero()) {
                if (this.valueIsAnswer) this.resetSecondDisplay();
                this.operators.includes(inputText.lastChar)
                    ? (inputText.value = inputText.replaceOperator())
                    : inputText.includesNumber() && inputText.includesOperator()
                        ? (inputText.value = this.countResult(inputText.value) + btnValue)
                        : (inputText.value += btnValue);
                }
                this.valueIsAnswer = false;
                break;
            case "action":
                if (inputText.notZero()) {
                    if (btnValue === "C") {
                        inputText.resetDisplay();
                        this.resetSecondDisplay();
                    } else if (btnValue === "B") {
                        inputText.value.length === 1
                            ? inputText.resetDisplay()
                            : (inputText.value = inputText.value.slice(0, -1));
                    } else if (inputText.includesNumber() && inputText.includesOperator()) {
                            this.secondDisplay.innerText = inputText.value + " =";
                            const result = this.countResult(inputText.value);
                        if (result) {
                            inputText.value = parseFloat(result.toFixed(10));
                        } else {
                            inputText.value = this.notification;
                            this.resetSecondDisplay();
                        }
                    }
                }
                break;
            case "dot":
                if (inputText.lastChar !== "." && inputText.notZero()) {
                    if (inputText.includesOperator()) {
                        if (Number.isInteger(this.splitByOperator(inputText.value)[1])) {
                            inputText.value += btnValue;
                        }
                    } else {
                        if (Number.isInteger(Number(inputText.value))) {
                            inputText.value += btnValue;
                        }
                    }
                }
                break;
        }
        inputText.includesOperator() && !this.valueIsAnswer
            ? (this.mainDisplay.innerText = inputText.addSpacesBetweenOperator())
            : (this.mainDisplay.innerText = inputText.value);
    }

    countResult(inputText) {
        const operator = inputText.match(/[+\-*/]/);
        const values = inputText.split(operator[0]).map(Number);
        this.valueIsAnswer = true;

        const a = new Decimal(values[0]);
        const b = new Decimal(values[1]);

        switch (operator[0]) {
        case "+":
            return a.add(b);
        case "-":
            return a.sub(b);
        case "/":
            return b.isZero() ? null : a.div(b);
        case "*":
            return a.mul(b);
        }
    }

    attachButtonListeners() {
        this.btn.forEach(button => {
            button.addEventListener('click', (event) => {
                const btnValue = event.target.getAttribute("data-value");
                const btnType = event.target.getAttribute("data-type");
                this.updateDisplay(btnValue, btnType);
            });
        });
    }
}
