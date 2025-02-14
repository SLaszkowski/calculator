import Calculator from "./src/Calculator.js"
import math from "./src/mathModule.js"

const btn = document.querySelectorAll('.btn');
const mainDisplay = document.querySelector(".mainDisplay");
const secondDisplay = document.querySelector(".secondDisplay");

const calculator = new Calculator(mainDisplay, secondDisplay, btn);
calculator.attachButtonListeners();