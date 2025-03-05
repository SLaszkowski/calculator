import Display from "../src/display.js";
import Logic from "../src/logic.js";
import "../src/controller.js";
import { parseStringToNumber, numberToString  }  from "../src/validator.js";

jest.mock("../src/logic.js");
jest.mock("../src/display.js");
jest.mock("../src/validator.js");

describe("controller", () => {
    let mainDisplay, secondDisplay, buttons, display, logic;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator__second-display"></div>
            <div class="calculator__main-display"></div>
            <button class="calculator__btn" data-type="number" data-value="6">6</button>
            <button class="calculator__btn" data-type="action" data-value="clear"></button>
            <button class="calculator__btn" data-type="action" data-value="delete"></button>
            <button class="calculator__btn" data-type="action" data-value="equal"></button>
            <button class="calculator__btn" data-type="operator" data-value="/"></button>
            <button class="calculator__btn" data-type="operator" data-value="+"></button>
            <button class="calculator__btn" data-type="operator" data-value="*"></button>
            <button class="calculator__btn" data-type="operator" data-value="-"></button>
            <button class="calculator__btn" data-type="dot" data-value=".">.</button>`

        mainDisplay = document.querySelector(".calculator__main-display");
        secondDisplay = document.querySelector(".calculator__second-display");
        buttons = document.querySelectorAll(".calculator__btn");

        display = new Display(mainDisplay, secondDisplay);
        logic = new Logic();
    });

    test("should clear both displays when clear button is clicked", () => {
        buttons[1].click();
        expect(display.clearBothDisplays).toHaveBeenCalled();
    });
})