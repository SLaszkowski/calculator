export default class Logic {
    constructor() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
        this.result = null;

        this.operators = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => {
                b === 0 ? null : a / b;
            },
        }
    }

    storeValue(value) {
        this.previousValue = this.currentValue;
        this.currentValue = value;
    }

    appendValue(valueAsString) {
        this.currentValue += valueAsString;
    }

    storeOperator(operator) {
        if(this.operators[operator]) {
            this.operator = operator;
            this.previousValue = this.currentValue;
            this.currentValue = "";
        }
    }

    calculate(a, b) {
        this.result = this.operators[this.operator](a, b);
    }

    reset() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
    }

}