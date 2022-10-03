//Access DOM elements
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#key-board button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      //NUMBER
      calc.addDigit(value);
    } else {
      calc.processOperation(value); //OPERATOR
    }
  });
});

//OJECT
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  //METHODS
  //add digit to calculator console
  addDigit(digit) {
    //check if current oparation already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateConsole();
  }

  //process all calculator operations
  processOperation(operation) {
    //check if current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }
    //get values for operations
    let operationValue;
    const previous = +previousOperationText.innerText.split(" ")[0];
    const current = +currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateConsole(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateConsole(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateConsole(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateConsole(operationValue, operation, current, previous);
        break;
      case "DEL":
        operationValue = previous * current;
        this.processDelOperator();
        break;
      case "CE":
        operationValue = previous * current;
        this.processClearCurrentOperation();
        break;
      case "C":
        operationValue = previous * current;
        this.processClearOperation();
        break;
      case "=":
        operationValue = previous * current;
        this.processEqualOperator();
        break;
      default:
        break;
    }
  }

  //update de screen console
  updateConsole(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //Check if value is 0, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }
      //Send current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
  //change math operations
  changeOperation(operation) {
    const mathOperations = ["*", "/", "-", "+"];
    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  processDelOperator(){
    this.currentOperationText.innerText =
        this.currentOperationText.innerText.slice(0, -1)
  }

  processClearCurrentOperation(){
    this.currentOperationText.innerText = ''
  }
  
  processClearOperation(){
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  processEqualOperator(){
    const operation = previousOperationText.innerText.split(' ')[1]
    this.processOperation(operation)
  }
}

//CREATE OBJECT CALCULATOR
const calc = new Calculator(previousOperationText, currentOperationText);
