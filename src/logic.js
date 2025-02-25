export default class Logic {
    constructor() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
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
        if(this.operator) {
            this.result = this.operators[this.operator](a, b);
        }
    }

    reset() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
        this.result = null;
    }

}