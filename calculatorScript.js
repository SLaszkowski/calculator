const btn = document.querySelectorAll('.btn');
const display = document.querySelector(".display");
const operators = ["+", "-", "x", "/"];

function updateDisplay(btnValue, btnType) {
    let inputText = display.innerText;
    let lastChar = inputText.charAt(inputText.length - 1);

    switch(btnType) {
        case "number":
            inputText === "0" ? inputText = btnValue : inputText += btnValue;
            break;
        case "operator":
            if (inputText != "0") {
                operators.includes(lastChar) ? inputText = inputText.replace(/.$/, btnValue)  : inputText += btnValue;
            }
            break;
        case "action":
            if(inputText != "0") {
                if(btnValue === "C") inputText = "0";
            }
            break;
        case "dot":
            break;
    }
    // Add spaces before and after operators
    const inputTextForDisplay = inputText => inputText.replace(/\s+/g, "").replace(/([+\-*/x])/g, " $1 ");

    display.innerText = inputTextForDisplay(inputText);
}

btn.forEach(button => {
    button.addEventListener('click', (event) => {
        const btnValue = event.target.getAttribute("data-value");
        const btnType = event.target.getAttribute("data-type");
        updateDisplay(btnValue, btnType);
    })
});