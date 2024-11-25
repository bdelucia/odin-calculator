let operand1 = null;
let operator = null;
let operand2 = null;
let result = 0;
let displayMessage = "";
let isNewNumber = true;

let expressions = [];

const calculatorLayout = [
    ["7","8","9"],
    ["4","5","6"],
    ["1","2","3"],
    ["0",".", "+/-"]
]

const flatCalcLayout = calculatorLayout.flat();

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
    expressions.push(operand);
    expressions.push(operator);
    
    console.log("After updateExpression: ", expressions);
    return expressions;
}

function clearDisplay(){
    display.textContent = "0"
    operand1 = 0;
    expressions.length = 0;
    console.log("Expressions cleared!")
}

function changeNumberSign(){
    if(display.textContent.charAt(0) !== "-")
        display.textContent = ["-", display.textContent].join("");
    else
        display.textContent = display.textContent.slice(1);
}

function updateDisplay(button){
    if(button.id === "AC"){
        clearDisplay();
        return;
    } else if (button.id === "+/-"){
        changeNumberSign();
        return;
    }

    if(flatCalcLayout.includes(button.id)){
        displayNumbers(button.id);
    } else {
        doOperate(button);
    }
}

function doOperate(button){
    console.log("operator: ", operator);
    console.log("isNewNumber: ", isNewNumber);
    if(operator === null || isNewNumber === true){
        console.log("Operator is null and new number is true")
        if(button.id !== "=")
            operator = button.id;
        operand1 = display.textContent;
        isNewNumber = true;
        return;
    }

    console.log("Operand1: ", operand1);
    console.log("Operator: ", operator);
    console.log("Operand2: ", display.textContent);
    operand1 = operate(parseFloat(operand1), operator, parseFloat(display.textContent));

    if(button.id === "=")
        operator = null;
    else
        operator = button.id;

    isNewNumber = true;
    displayNumbers(operand1);
    isNewNumber = true;
}

function displayNumbers(number){
    if(isNewNumber){
        isNewNumber = false;
        display.textContent = "";
    }

    if(display.textContent === "0" && number === ".")
        display.textContent = "0.";
    else if(display.textContent.includes(".") && number === ".")
        return;
    else if(display.textContent === "0")
        display.textContent = number
    else
        display.textContent += number;
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
        updateDisplay(button);
    }) 
})