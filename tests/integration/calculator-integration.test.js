import calculatorController from "../../src/controller";
import Display from "../../src/display";
import Logic from "../../src/logic";
import { fireEvent } from "@testing-library/dom";

// Used rest operator to click buttons consecutively
function clickButtonsbyDataValue(...btnValue) {
    btnValue.forEach((btnValue) => fireEvent.click(document.querySelector(`[data-value="${btnValue}"]`)))
}

const testData = [
    ["3", "+", "1", "3 + 1 =", "4"],
    ["9", "-", "7", "9 - 7 =", "2"],
    ["2", "*", "5", "2 * 5 =", "10"],
    ["4", "/", "2", "4 / 2 =", "2"]
];

describe("calculator integration tests", () => {
    let mainDisplay, secondDisplay, buttons, display, logic;
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator__second-display"></div>
            <div class="calculator__main-display"></div>
            <button class="calculator__btn" data-type="number" data-value="1">1</button>
            <button class="calculator__btn" data-type="number" data-value="2">2</button>
            <button class="calculator__btn" data-type="number" data-value="3">3</button>
            <button class="calculator__btn" data-type="number" data-value="4">4</button>
            <button class="calculator__btn" data-type="number" data-value="5">5</button>
            <button class="calculator__btn" data-type="number" data-value="6">6</button>
            <button class="calculator__btn" data-type="number" data-value="7">7</button>
            <button class="calculator__btn" data-type="number" data-value="8">8</button>
            <button class="calculator__btn" data-type="number" data-value="9">9</button>
            <button class="calculator__btn" data-type="action" data-value="clear"></button>
            <button class="calculator__btn" data-type="action" data-value="delete"></button>
            <button class="calculator__btn" data-type="action" data-value="equal"></button>
            <button class="calculator__btn" data-type="operator" data-value="/"></button>
            <button class="calculator__btn" data-type="operator" data-value="+"></button>
            <button class="calculator__btn" data-type="operator" data-value="*"></button>
            <button class="calculator__btn" data-type="operator" data-value="-"></button>
            <button class="calculator__btn" data-type="dot" data-value=".">.</button>
        `
        mainDisplay = document.querySelector(".calculator__main-display");
        secondDisplay = document.querySelector(".calculator__second-display");
        buttons = document.querySelectorAll(".calculator__btn");
        display = new Display(mainDisplay, secondDisplay);
        logic = new Logic();

        calculatorController(buttons, display, logic);
    })

    test.each(testData)("should calculate result correctly and show in both displays", (button1, button2, button3, expectSecondDisplay, expectMainDisplay) => {
        clickButtonsbyDataValue(button1, button2, button3, "equal");
        expect(display.secondDisplay.innerText).toBe(expectSecondDisplay)
        expect(display.mainDisplay.innerText).toBe(expectMainDisplay)
        clickButtonsbyDataValue("clear");
    })
})