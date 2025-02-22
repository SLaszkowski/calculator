export default class Logic {
    constructor() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;

        this.operators = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => a / b,
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

    calculate = () => this.operators[this.operator](this.previousValue, this.currentValue)

    reset() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = null;
    }

}