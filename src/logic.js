
export default class Logic {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add = (a, b) => a + b;

    subtract = (a, b) => a - b;

    multiply = (a, b) => a * b;

    divide = (a, b) => {
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b;
    };
}