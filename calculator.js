
function add(num1, num2) {
    return Math.round((num1 + num2) * 10) / 10;
}

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 10) / 10;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 10) / 10;
}

function divide(num1, num2) {
    return Math.round((num1 / num2) * 10) / 10 ;
}

const operations = {
    '+' : add,
    'add' : add,
    '-' : subtract,
    'subtract' : subtract,
    '×' : multiply,
    '*' : multiply,
    'x' : multiply,
    'multiply' : multiply,
    '÷' : divide,
    '/' : divide,
    'divide' : divide,
}

function operate(num1, operator, num2) {
    if (operations[operator]) {
        return operations[operator](num1, num2);
    }   
}

const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('.key.number');
const operatorKeys = document.querySelectorAll('.key.operator');
const changeSign = document.querySelector('.key.change-sign');
const backspaceKey = document.querySelector('.key.backspace');
const clearKey = document.querySelector('.key.clear');
const equalsKey = document.querySelector('.key.equals');

let displayInput = document.querySelector('.user-input');
let firstNumber, secondNumber, firstTerm, secondTerm, operator;

function printInput(input) {
    display.insertBefore(input, display.childNodes[1]);
}

function resetValues() {
    operator = null;
    firstNumber = '';
    secondNumber = ''
    firstTerm = null;
    secondTerm = null;
    displayInput.textContent = '';
    display.insertBefore(displayInput, display.childNodes[1]);
}

resetValues();

numberKeys.forEach((number) => {
    number.addEventListener('click', () => {
        if (!operator) {
            if (number.textContent !== '.') {
                if (firstNumber === '0') {firstNumber = ''}
            } else if (number.textContent === '.' && secondNumber === '') {
                firstNumber = '0';
            }
            firstNumber += number.textContent; // concat the number as string
            firstTerm = parseFloat(firstNumber); // convert the string to float to operate with it
            displayInput.textContent = firstNumber;
        } else {
            if (number.textContent !== '.') {
                if (secondNumber === '0') {
                    secondNumber = '';
                }
            } else if (number.textContent === '.' && secondNumber === '') {
                secondNumber = '0';
            }
            secondNumber += number.textContent;
            secondTerm = parseFloat(secondNumber);
            displayInput.textContent = firstNumber + ' ' + operator + ' ' + secondNumber;
        }
        printInput(displayInput);
    })
})

operatorKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (firstTerm === null) {
            operator = null;
        } else if (secondTerm === null) {
            if (!operator) {
                operator = key.textContent;
                displayInput.textContent += ' ' + operator;
            } else {
                operator = key.textContent;
                displayInput.textContent = firstNumber + ' ' + operator;
            }
        } else {
            firstTerm = operations[operator](firstTerm, secondTerm);
            secondTerm = null;
            secondNumber = '';
            firstNumber = String(firstTerm);
            operator = key.textContent;
            displayInput.textContent = firstNumber + ' ' + operator;
        }
        printInput(displayInput);
    })
})

function deleteFirstChar(str) {
    str = str.split('').slice(1).join('');
    if (str[0] === ' ') {
        str = str.split('').slice(1).join('');
    }
    console.log(str);
    return str;
}

changeSign.addEventListener('click', () => {
    if (!operator) {
        if (firstTerm && firstTerm > 0) {
            firstTerm = -firstTerm;
            firstNumber = '-' + firstNumber;
            displayInput.textContent = firstNumber;
        } else if (firstTerm && firstTerm < 0) {
            firstTerm *= -1;
            firstNumber = deleteFirstChar(firstNumber);
            displayInput.textContent = firstNumber;
        }
    } else if (secondTerm && secondTerm > 0) {
        secondTerm = -secondTerm;
        secondNumber = '-' + secondNumber;
        displayInput.textContent = firstNumber + ' ' + operator + ' (' + secondNumber + ')';
    }
})

function deleteLastChar(str) {
    str = str.split('').slice(0, -1).join('');
    if (str.slice(-1) === ' ') {
        str = str.split('').slice(0, -1).join('');
    }
    return str;
}

backspaceKey.addEventListener('click', () => {
    if (!secondTerm) {
        if (!operator) {
            displayInput.textContent = deleteLastChar(displayInput.textContent);
            if (displayInput.textContent === '') {
                firstNumber = '';
                firstTerm = null;
            } else {
                firstNumber = displayInput.textContent;
                firstTerm = parseFloat(firstNumber);
            }
        } else {
            displayInput.textContent = deleteLastChar(displayInput.textContent);
            operator = null;
        }
    } else {
        secondNumber = deleteLastChar(secondNumber);
        displayInput.textContent = firstNumber + ' ' + operator;
        if (secondNumber === '') {
            secondTerm = null;
        } else {
            secondTerm = parseFloat(secondNumber);
            displayInput.textContent += ' ' + secondNumber;
        }
    }
})

clearKey.addEventListener('click', () => {
    resetValues();
})

equalsKey.addEventListener('click', () => {
    let result;
    if (secondTerm) {
        result = operations[operator](firstTerm, secondTerm);
        firstTerm = result;
        firstNumber = String(firstTerm);
        secondTerm = null;
        operator = null;
        secondNumber = '';
        displayInput.textContent = result;
    }
})