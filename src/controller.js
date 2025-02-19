import Display from "./display.js";
import Logic from "./logic.js";
import Validation from "./validation.js";

const buttons = document.querySelectorAll('.btn');
const mainDisplay = document.querySelector(".mainDisplay");
const secondDisplay = document.querySelector(".secondDisplay");

const display = new Display(mainDisplay, secondDisplay);
const logic = new Logic()


buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        const btnValue = event.target.getAttribute("data-value");
        const btnType = event.target.getAttribute("data-type");
        switch(btnType) {
            case "number":
                break;
            case "operator":
                break;
            case "action":
                break;
            case "dot":
                break;
        }
    });
});