
export default class Logic {
    constructor() {
        this.currentValue = null;
        this.previousValue = null;
        this.operator = null;

        this.operators = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => a / b,
        }
    }

    storeOperator(operator) {
        if(this.operators[this.operator]) {
            this.operator = operator;
            this.currentValue = this.previousValue;
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