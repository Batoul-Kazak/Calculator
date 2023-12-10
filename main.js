class Calculator {
    /** 
     * @param {HTMLElement} previousOperandTextElement 
     * @param {HTMLElement} currentOperandTextElement 
     */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined; 
    }

    delete() {

    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperand(operand) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.currentOperand;
        }
}



const 
    numberButtons = document.querySelectorAll("[data-number]"),
    operationButtons = document.querySelectorAll("[data-operation]"),
    equalsButton = document.querySelector("[data-equals]"),
    deleteButton = document.querySelector("[data-delete]"),
    ClearAllButton = document.querySelector("[data-all-clear]"),
    previousOperandTextElement = document.querySelector("[data-previous-operand]"),
    currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);  

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});