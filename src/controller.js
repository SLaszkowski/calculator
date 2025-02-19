import Display from "./display.js";
import Logic from "./logic.js";
import Validation from "./validation.js";

const btn = document.querySelectorAll('.btn');
const mainDisplay = document.querySelector(".mainDisplay");
const secondDisplay = document.querySelector(".secondDisplay");

const display = new Display(mainDisplay, secondDisplay);

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const value = event.target.getAttribute("data-value");
        const type = event.target.getAttribute("data-type");

        switch()
    });
});