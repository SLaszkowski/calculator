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
        if(this.currentValue.length < this.precision) {
            this.currentValue += valueAsString;
        }
    }

    storeResultAsCurrValue(result) {
        if(result) {
            this.currentValue = result;
            this.previousValue = "";
            this.result = null;
            this.operator = "";
        }
    }

    storeOperator(operator) {
        if(
            this.operators[operator] &&
            this.currentValue.charAt(this.currentValue.length - 1) !== "." &&
            this.previousValue.charAt(this.previousValue.length - 1) !== "."
        ) {
            if(!this.currentValue && !this.previousValue && operator === "-") { // When minus is pressed as first operator
                this.appendValue(operator);
            } else if(this.currentValue && this.currentValue !== "-"
            ) { // When operator is pressed after a number
                this.operator = operator;
                this.previousValue = this.currentValue;
                this.currentValue = "";
            } else if(this.operator && this.previousValue) { // When operator is pressed after another operator
                this.operator = operator;
            }
        }
    }

    calculateResult(a, b) {
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
        if(this.currentValue) this.currentValue = this.currentValue.slice(0, -1);
        else if(this.operator) this.operator = "";
        else if(this.previousValue) this.previousValue = this.previousValue.slice(0, -1);
    }
}