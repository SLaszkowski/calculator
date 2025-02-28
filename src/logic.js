export default class Logic {
    constructor() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = "";
        this.result = null;
        this.precision = 9;

        this.operators = {
            "+": (a, b) => this.fixFloat(a + b),
            "-": (a, b) => this.fixFloat(a - b),
            "*": (a, b) => this.fixFloat(a * b),
            "/": (a, b) => b === 0 ? null : this.fixFloat(a / b),
        }
    }

    fixFloat(value) {
        return parseFloat(value.toFixed(9));
    }

    appendValue(valueAsString) {
        this.currentValue += valueAsString;
    }

    storeValues() {
        if(this.result) {
            this.previousValue = this.result;
            this.currentValue = "";
            this.result = null;
            this.operator = "";
        } else {
            this.previousValue = this.currentValue;
            this.currentValue = "";
        }
    }

    storeOperator(operator) {
        if(this.operators[operator]) this.operator = operator;
    }

    calculate(a, b) {
        if(this.operator) {
            this.result = this.operators[this.operator](a, b);
        }
    }

    reset() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = "";
        this.result = null;
    }

    delete() {
        this.currentValue = this.currentValue.slice(0, -1);
    }

}