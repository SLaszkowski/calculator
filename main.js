import Calculator from "./src/Calculator.js"

const btn = document.querySelectorAll('.btn');
const mainDisplay = document.querySelector(".mainDisplay");
const secondDisplay = document.querySelector(".secondDisplay");

const calculator = new Calculator(mainDisplay, secondDisplay, btn);
calculator.attachButtonListeners();