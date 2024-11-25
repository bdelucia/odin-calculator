let operand1 = null;
let operator = null;
let operand2 = null;
let result = 0;
let displayMessage = "";
let isNewNumber = true;

// i used this 2D array to easily make initialize the divs easier
const calculatorLayout = [
    ["7","8","9"],
    ["4","5","6"],
    ["1","2","3"],
    ["0",".", "+/-"]
]

// helps check if a button is in the calculator layout, flattens 2D array to 1D for checking
const flatCalcLayout = calculatorLayout.flat();

// array for operators flexbox layout
const operatorsLayout = [
    'AC',
    '+',
    '-',
    'x',
    '/',
    '='
]

// selecting each flexbox
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const display = document.querySelector(".display");

// functions for use in parent function operate
function add(a, b){ return a + b;}
function subtract(a, b){ return a - b;}
function multiply(a, b){ return a * b;}
function divide(a, b){ return a / b;}

// calculates the result of 2 given operands and an operator (+, -, x, /)
function operate(operand1, operator, operand2){
    let result = 0;
    // base case, check if inputs are of valid type
    if(typeof(operand1) !== "number" || typeof(operator) !== "string" || typeof(operand2) !== "number")
        return "Invalid input type(s)";

    switch (operator){
        case '+':
            result = add(operand1, operand2);
            break;
        case '-':
            result = subtract(operand1, operand2);
            break;
        case 'x': 
            result = multiply(operand1, operand2);
            break;
        case '/':
            result = divide(operand1, operand2);
            break;
    }
    return result;
}

// Sets display and operand1 back to 0
function clearDisplay(){
    display.textContent = "0"
    operand1 = 0;
}

// Adds/removes negative sign
function changeNumberSign(){
    if(display.textContent.charAt(0) !== "-")
        display.textContent = ["-", display.textContent].join("");
    else
        display.textContent = display.textContent.slice(1);
}


// All buttons call this first, runs functions based on button id
function updateDisplay(button){
    if(button.id === "AC"){
        clearDisplay();
        return;
    } else if (button.id === "+/-"){
        changeNumberSign();
        return;
    }

    // if button.id is an input digit (0-9, ".")
    if(flatCalcLayout.includes(button.id)){
        displayNumbers(button.id);
    } else {
        doOperate(button); // each time an operator button is pressed, call function that updates operand1
    }
}

// Called each time an operator button is pressed (+, -, x, /, =)
function doOperate(button){
    // setting the operator and operand base case
    if(operator === null || isNewNumber === true){
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

    // operator buttons already calculate expressions, so = just needs to do the one stored instead of appending another expression.
    if(button.id === "=")
        operator = null;
    else
        operator = button.id;

    isNewNumber = true; // prevents current result from being appended to current display
    displayNumbers(parseFloat(operand1.toFixed(10))); // displays the result
    isNewNumber = true; // gets ready for next input by not allowing for input to be appended to result
}

// Handles display of numbers, called when digit buttons (0-9, ".") are pressed or running total is displayed after operator button press
function displayNumbers(number){
    // base case, if creating new number, set to false and reset display temporarily
    if(isNewNumber){
        isNewNumber = false;
        display.textContent = "";
    }

    if(display.textContent === "" && number === ".") // Adds 0 to front of "." if it is the first input for nice appearance
        display.textContent = "0.";
    else if(display.textContent.includes(".") && number === ".") // if displayed number already has a "."
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

// Initializes operator 1x6 grid and input divs
for(let i = 0; i < 6; i++){
    const operatorBox = document.createElement("div");
    operatorBox.textContent = operatorsLayout[i];
    operatorBox.classList.add('button');
    operatorBox.setAttribute('id', operatorsLayout[i]);

    operators.appendChild(operatorBox);
}

// Add event handlers for each button
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = `rgb(255, 255, 255, 0.1)`;
        button.style.color = "white";
        button.style.textShadow = "0 0 5px #f6f5f4, 0 0 10px #f6f5f4, 0 0 20px #f6f5f4"
    })
    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "rgb(36, 35, 35)";
        button.style.color = "cyan";
        button.style.textShadow = "0 0 5px #f6f5f4, 0 0 10px #f6f5f4, 0 0 20px #f6f5f4"
    })
    button.addEventListener("click", function() {
        updateDisplay(button);
    }) 
})