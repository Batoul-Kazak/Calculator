//35:15
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.CurrentOperand = "";
        this.previousOperand = "";
        this.operation = "";
    }

    delete() {
        this.CurrentOperand = this.CurrentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.CurrentOperand.includes('.')) return;
        this.CurrentOperand = this.CurrentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.CurrentOperand.innerText === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.CurrentOperand;
        this.CurrentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.CurrentOperand);

        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '×': result = prev * current; break;
            case '÷': result = prev / current; break;
        
            default: return;
        }
        this.CurrentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const StringNumber = number.toString();
        const floatNumber = parseFloat(number);
        const integerDigits = parseFloat(StringNumber.split('.'[0]));
        const decimalDigits = StringNumber.split('.'[1]);
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${integerDigits}`;
        } else {
            return integerDisplay;
        }
        // if(isNaN(floatNumber)) return '';
        // return floatNumber.toLocaleString('en');
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.CurrentOperand;
        this.getDisplayNumber(this.CurrentOperand);
        if(this.operation !== null)
            {
                this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const dataNumber = document.querySelectorAll("[data-number]");
const dataOperation = document.querySelectorAll("[data-operation]");
const dataDelete = document.querySelector("[data-delete]");
const dataClearAll = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const dataEquals = document.querySelector("[data-equals]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

dataNumber.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

dataOperation.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

dataEquals.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

dataClearAll.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

dataDelete.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});