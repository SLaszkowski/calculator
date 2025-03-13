import calculatorController from "./controller.js";
import Display from "./display.js";
import Logic from "./logic.js";

const mainDisplay = document.querySelector(".calculator__main-display");
const secondDisplay = document.querySelector(".calculator__second-display");
const display = new Display(mainDisplay, secondDisplay);
const logic = new Logic();

calculatorController(display, logic);