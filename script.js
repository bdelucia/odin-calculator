let operand1 = 0;
let operator = "";
let operand2 = 0;
let result = 0;

const calculatorLayout = [
    ["7","8","9"],
    ["4","5","6"],
    ["1","2","3"],
    ["0",".", "+/-"]
]

const operatorsLayout = [
    'Clear',
    '+',
    '-',
    'x',
    '/',
    '='
]

const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");

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

// Initializes 3x4 grid and number input divs
for(let i = 0; i < calculatorLayout.length; i++){
    for(let j = 0; j < calculatorLayout[i].length; j++){
        const digitBox = document.createElement("div");
        digitBox.textContent = calculatorLayout[i][j];
        digitBox.classList.add('button');
        digitBox.setAttribute('id', calculatorLayout[i][j])

        numbers.appendChild(digitBox);
    }
}

for(let i = 0; i < 6; i++){
    const operatorBox = document.createElement("div");
    operatorBox.textContent = operatorsLayout[i];
    operatorBox.classList.add('button');
    operatorBox.setAttribute('id', operatorsLayout[i]);

    operators.appendChild(operatorBox);
}

console.log(operate(1, '+', 3));