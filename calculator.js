

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return Math.trunc(num1 / num2);
}

let number1, number2, operator;

function operate(num1, operator, num2) {
    switch (operator) {
        case ['+', 'add'].includes(operator):
            return add(num1, num2);
        case ['-', 'subtract'].includes(operator):
            return subtract(num1, num2);
        case ['x', '*', 'multiply'].includes(operator):
            return multiply(num1, num2);
        case ['/', 'divide'].includes(operator):
            return divide(num1, num2);
            

    }
}
