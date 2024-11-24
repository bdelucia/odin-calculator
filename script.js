let operand1 = null;
let operator = null;
let operand2 = null;
let result = 0;
let displayMessage = "";
let digitsPressed = false;
let acceptingOperand2 = false;

let expressions = [];

const calculatorLayout = [
    ["7","8","9"],
    ["4","5","6"],
    ["1","2","3"],
    ["0",".", "+/-"]
]

const operatorsLayout = [
    'AC',
    '+',
    '-',
    'x',
    '/',
    '='
]

const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const display = document.querySelector(".display");

function add(a, b){ return a + b;}
function subtract(a, b){ return a - b;}
function multiply(a, b){ return a * b;}
function divide(a, b){ return a / b;}

function operate(operand1, operator, operand2){
    let result = 0;
    // base case, check if inputs are valid
    if(typeof(operand1) !== "number" || typeof(operator) !== "string" || typeof(operand2) !== "number")
        return NaN;

    switch (operator){
        case '+':
            result = add(operand1, operand2);
            //console.log(result);
            break;
        case '-':
            result = subtract(operand1, operand2);
            //console.log(result);
            break;
        case 'x': 
            result = multiply(operand1, operand2);
            //console.log(result);
            break;
        case '/':
            result = divide(operand1, operand2);
            //console.log(result);
            break;
    }
    return result;
}

function updateExpression(operator, operand){
    let result = 0;
    if(expressions.length === 2){
        expressions.push(operand);
        result = calculate(expressions);
        expressions.length = 0;
        expressions[0] = result;
        display.textContent = result;
    } else if (expressions.length === 1){
        expressions.push(operator);
        expressions.push(operand)
        result = calculate(expressions);
        expressions.length = 0;
        expressions[0] = result;
        display.textContent = result;
    } else {
        expressions.push(operand);
        expressions.push(operator);
    }
    console.log("After updateExpression: ", expressions);
    return expressions;
}

function calculate(expressionArray){
    let result = 0;
    let operand1 = parseFloat(expressionArray[0]);
    let operator = expressionArray[1];
    let operand2 = parseFloat(expressionArray[2]);
    
    result = operate(operand1, operator, operand2);
    console.log("Operand 1: ", operand1);
    console.log("Operator: ", operator);
    console.log("Operand 2: ", operand2);
    console.log("Expression to calculate: ", expressionArray);
    console.log("Result of expression: ", result);

    return result;
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

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = `rgb(0, 0, 255, 0.1)`;
    })
    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "white";
    })
    button.addEventListener("click", function() {
        switch (button.id){
            case 'AC':
                display.textContent = "0"
                operand1 = 0;
                expressions.length = 0;
                console.log("Expressions cleared!")
                break;
            case '+/-':
                if(display.textContent.charAt(0) !== "-")
                    display.textContent = ["-", display.textContent].join("");
                else
                    display.textContent = display.textContent.slice(1);
                break;
            case ".":
                display.textContent += button.id; 
                break;
            case "+":
                updateExpression(button.id, display.textContent);
                break;
            case "-":
                updateExpression(button.id, display.textContent);
                break;
            case "x":
                updateExpression(button.id, display.textContent);
                break;
            case "/":
                updateExpression(button.id, display.textContent);
                break;
            case "=":
                expressions.push(display.textContent)
                break;
            default:
                if(expressions.length && display.textContent === expressions[expressions.length - 2]){
                    display.textContent = button.id;
                    break;
                }

                    
                if(display.textContent === '0' || expressions.length)
                    display.textContent = button.id;
                else
                    display.textContent += button.id;

        }


    }) 
})

console.log(operate(1, '+', 3));