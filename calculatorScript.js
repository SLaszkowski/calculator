const btn = document.querySelectorAll('.btn');
const display = document.querySelector(".display");
const operators = ["+", "-", "x", "/"];

const regOperators = /([+\-*/x])/g;
const regNumbers = /\d+$/;
const regSpaces = /\s+/g;

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
                ? inputText.value += btnValue
                : inputText.value = btnValue
            break;
        case "operator":
            if (inputText.notZero()) {
                operators.includes(inputText.lastChar)
                    ? inputText.value = inputText.replaceOperator()
                    : inputText.value += btnValue;
            }
            break;
        case "action":
            if(inputText.notZero()) {
                if(btnValue === "C") inputText.value = "0"
                else if(inputText.includesNumber() && inputText.includesOperator()) inputText.value = count(inputText.value, btnValue);
            }
            break;
        case "dot":
            break;
    }

    inputText.includesOperator() ? display.innerText = inputText.addSpacesBetweenOperator() : display.innerText = inputText.value;
}

function count(inputText, btnValue) {
    const operator = inputText.match(/[+\-*/]/);
    const values = inputText.split("+").map(Number);
    console.log(values)
    switch(operator[0]) {
        case "+":
            return values[0] + values[1];
        case "-":
            return values[0] - values[1];
        case "/":
            return values[0] / values[1];
        case "x":
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