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

    appendValue(value) {
        this.currentValue += value;
    }

    storeOperator(operator) {
        if(this.operators[this.operator]) {
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