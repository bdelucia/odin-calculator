let operand1 = 0;
let operator = "";
let operand2 = 0;
let result = 0;

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
// Initializes divs for the input numbers, sets up grid
for(let i = 0; i < 4; i++){
    for(let j = 0; j < 3; j++){
        const digitBox = document.createElement("div");
        digitBox.style.flexBasis = `calc(33.333%)`;
        digitBox.style.boxSizing = "border-box";
        digitBox.style.border = "1px solid black";

        numbers.appendChild(digitBox);
    }
}


console.log(operate(1, '+', 3));