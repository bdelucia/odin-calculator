let operand1 = 0;
let operator = "";
let operand2 = 0;
let result = 0;

function add(a, b){ return a + b;}
function subtract(a, b){ return a - b;}
function multiply(a, b){ return a * b;}
function divide(a, b){ return a / b;}

function operate(operand1, operator, operand2){
    // base case, check if inputs are valid
    if(typeof(operand1) !== "number" || typeof(operator) !== "string" || typeof(operand2) !== "number")
        return NaN;

    switch (operator){
        case '+':
            result = add(operand1, operand2);
            console.log(result);
            break;
        case '-':
            result = subtract(operand1, operand2);
            console.log(result);
            break;
        case '*': 
            result = multiply(operand1, operand2);
            console.log(result);
            break;
        case '/':
            result = divide(operand1, operand2);
            console.log(result);
            break;
    }
}

console.log(operate(1, '+', 3));