'use strict';
const btn = document.querySelectorAll('.btn');
const display = document.querySelector(".display");
const operators = ["+", "-", "*", "/"];

const regOperators = /([+\-*/])/g;
const regNumbers = /\d+$/;
const regSpaces = /\s+/g;
let valueIsAnswer = false;

function updateDisplay(btnValue, btnType) {
    const inputText = {
        value: display.innerText,
        lastChar: display.innerText.charAt(display.innerText.length - 1),
        removeSpaces: function() { return this.value.replace(regSpaces, ""); },
        notZero: function() { return this.value != "0"; },
        includesNumber: function() { return /\d+$/.test(this.value) },
        includesOperator: function() { return /[+\-*/]/.test(this.value) },
        replaceOperator: function() { return this.value.replace(/.$/, btnValue) },
        addSpacesBetweenOperator: function() { return this.value.replace(regOperators, " $1 ") }
    };
    inputText.removeSpaces();

    switch(btnType) {
        case "number":
            inputText.notZero()
                ? valueIsAnswer ? inputText.value = btnValue : inputText.value += btnValue
                : btnValue === "00" ? inputText.value = "0" : inputText.value = btnValue
            valueIsAnswer = false;
            break;
        case "operator":
            if (inputText.notZero()) {
                operators.includes(inputText.lastChar)
                    ? inputText.value = inputText.replaceOperator()
                    : inputText.value += btnValue;
            }
            valueIsAnswer = false;
            break;
        case "action":
            if(inputText.notZero()) {
                if(btnValue === "C") inputText.value = "0"
                else if(inputText.includesNumber() && inputText.includesOperator()) inputText.value = countResult(inputText.value);
            }
            break;
        case "dot":
            break;
    }
    inputText.includesOperator() && !(valueIsAnswer) ? display.innerText = inputText.addSpacesBetweenOperator() : display.innerText = inputText.value;
}

function countResult(inputText) {
    const operator = inputText.match(/[+\-*/]/);
    const values = inputText.split(operator[0]).map(Number);
    valueIsAnswer = true;

    switch(operator[0]) {
        case "+":
            return values[0] + values[1];
        case "-":
            return values[0] - values[1];
        case "/":
            return values[0] / values[1];
        case "*":
            return values[0] * values[1];
    }
}

btn.forEach(button => {
    button.addEventListener('click', (event) => {
        const btnValue = event.target.getAttribute("data-value");
        const btnType = event.target.getAttribute("data-type");
        updateDisplay(btnValue, btnType);
    })
});