'use strict';

const btn = document.querySelectorAll('.btn');
const mainDisplay = document.querySelector(".mainDisplay");
const secondDisplay = document.querySelector(".secondDisplay");
const operators = ["+", "-", "*", "/"];

const regOperators = /([+\-*/])/g;
const regNumbers = /\d+$/;
const regSpaces = /\s+/g;
let valueIsAnswer = false;

const resetSecondDisplay = () => secondDisplay.innerText = "";
const splitByOperator = inputText => inputText.split(inputText.match(/[+\-*/]/)[0]).map(Number);

function updateDisplay(btnValue, btnType) {
    const inputText = {
        value: mainDisplay.innerText,
        lastChar: mainDisplay.innerText.charAt(mainDisplay.innerText.length - 1),
        removeSpaces: function() { return this.value.replace(regSpaces, ""); },
        notZero: function() { return this.value != "0"; },
        includesNumber: function() { return /\d+$/.test(this.value) },
        includesOperator: function() { return /[+\-*/]/.test(this.value) },
        replaceOperator: function() { return this.value.replace(/.$/, btnValue) },
        addSpacesBetweenOperator: function() { return this.value.replace(regOperators, " $1 ") },
        resetDisplay: function() { return this.value = "0" },
    };

    inputText.removeSpaces();

    switch(btnType) {
        case "number":
            inputText.notZero()
                ? valueIsAnswer ? inputText.value = btnValue : inputText.value += btnValue
                : inputText.value = btnValue
            valueIsAnswer = false;
            resetSecondDisplay();
            break;
        case "operator":
            if (inputText.notZero()) {
                if(valueIsAnswer) resetSecondDisplay();
                operators.includes(inputText.lastChar)
                    ? inputText.value = inputText.replaceOperator()
                    : inputText.includesNumber() && inputText.includesOperator()
                        ? inputText.value = countResult(inputText.value) + btnValue
                        : inputText.value += btnValue
            }
            valueIsAnswer = false;
            break;
        case "action":
            if(inputText.notZero()) {
                if(btnValue === "C") {
                    inputText.resetDisplay();
                    resetSecondDisplay();
                }
                else if(btnValue === "B") inputText.value.length === 1 ? inputText.resetDisplay() : inputText.value = (inputText.value).slice(0, -1)
                else if(inputText.includesNumber() && inputText.includesOperator()) {
                    secondDisplay.innerText = inputText.value + " =";
                    inputText.value = parseFloat(countResult(inputText.value).toFixed(10));
                }
            }
            break;
        case "dot":
            if(inputText.lastChar !== "." && inputText.notZero()) {
                if(inputText.includesOperator()) {
                    if(Number.isInteger(splitByOperator(inputText.value)[1])) inputText.value += btnValue;
                } else {
                    if(Number.isInteger(Number(inputText.value))) inputText.value += btnValue;
                }
            }
            break;
    }
    inputText.includesOperator() && !(valueIsAnswer) ? mainDisplay.innerText = inputText.addSpacesBetweenOperator() : mainDisplay.innerText = inputText.value;
}

function countResult(inputText) {
    const operator = inputText.match(/[+\-*/]/);
    const values = inputText.split(operator[0]).map(Number);
    valueIsAnswer = true;
    const a = new Decimal(values[0]);
    const b = new Decimal(values[1]);

    switch(operator[0]) {
        case "+":
            return a.add(b);
        case "-":
            return a.sub(b);
        case "/":
            return a.div(b);
        case "*":
            return a.mul(b);
    }
}

btn.forEach(button => {
    button.addEventListener('click', (event) => {
        const btnValue = event.target.getAttribute("data-value");
        const btnType = event.target.getAttribute("data-type");
        updateDisplay(btnValue, btnType);
    })
});