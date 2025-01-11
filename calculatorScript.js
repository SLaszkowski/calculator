const btn = document.querySelectorAll('.btn');
const display = document.querySelector(".display");

function updateDisplay(btnValue, btnType) {
    switch(btnType) {
        case "number":
            display.innerText += btnValue;
            break;
        case "operator":
            display.innerText += btnValue;
            break;
        case "action":
            if(btnValue === "C") display.innerText = "0";
            break;
        case "dot":
            display.innerText += btnValue;
            break;
    }
}

btn.forEach(button => {
    button.addEventListener('click', (event) => {
        const btnValue = event.target.getAttribute("data-value");
        const btnType = event.target.getAttribute("data-type");
        updateDisplay(btnValue, btnType);
    })
});