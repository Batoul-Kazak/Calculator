const dataNumber = document.querySelectorAll("[data-number]");
const dataOperation = document.querySelectorAll("[data-operation]");
const dataDelete = document.querySelector("[data-delete]");
const dataClearAll = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const dataEquals = document.querySelector("[data-equals]");
const additionalOperations = document.querySelector("#additional-operations");

const dataFunction = document.querySelectorAll("[data-function]");
const dataBracket = document.querySelectorAll("[data-bracket]");

let isResult = false;
let funcOpened = false;

dataNumber.forEach(number => {
    number.addEventListener("click", _e => {
        if(number.textContent === '.' && currentOperandTextElement.textContent.includes('.')) return; 
        if(isResult) currentOperandTextElement.textContent = number.textContent
        else currentOperandTextElement.textContent += number.textContent;
        isResult = false;
    });
});

dataOperation.forEach(operation => {
    operation.addEventListener("click", _e => {
        if(currentOperandTextElement.textContent.includes('+' || '-' || '×' || '÷')) return;
        if(currentOperandTextElement.textContent.length < 1) return;
        previousOperandTextElement.textContent = currentOperandTextElement.textContent + operation.textContent;
        currentOperandTextElement.textContent = '';
    });
});

dataEquals.addEventListener("click", _e => {
    let firstNumber = Number(previousOperandTextElement.textContent.slice(0, -1));
    let operation = previousOperandTextElement.textContent.slice(-1);
    let secondNumber = Number(currentOperandTextElement.textContent);
    let result;
    console.log(operation, firstNumber);
    switch (operation) {
        case '+': result = firstNumber + secondNumber; break;
        case '-': result = firstNumber - secondNumber; break;
        case '×': result = firstNumber * secondNumber; break;
        case '÷': result = firstNumber / secondNumber; break;
    }

    previousOperandTextElement.textContent = '';
    currentOperandTextElement.textContent = result;
    isResult = true;
});

dataClearAll.addEventListener("click", _e => {
    currentOperandTextElement.textContent = '';
    previousOperandTextElement.textContent = '';
});

dataDelete.addEventListener("click", _e => {
    currentOperandTextElement.textContent = currentOperandTextElement.textContent.slice(0, -1);
});

additionalOperations.addEventListener("click", _e => {
    document.querySelector("#advanced-operations-container").classList.remove("hidden");
    document.querySelector("#clac-container").classList.remove("centered")
});


// dataFunction.forEach(func => {
//     func.addEventListener("click", _e => {
//         if(currentOperandTextElement.textContent != '') return;
//         currentOperandTextElement.textContent = func.textContent + '(';
//     });
// });