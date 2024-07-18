document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "0";

  // Map for keyboard keys to calculator buttons
  const keyMap = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "%": "%",
    Enter: "=",
    Backspace: "←",
    Delete: "C",
    ".": ".",
  };

  // Handle button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;
      handleInput(value);
    });
  });

  // Handle keyboard inputs
  document.addEventListener("keydown", function (event) {
    if (keyMap.hasOwnProperty(event.key)) {
      event.preventDefault(); // Prevent the default action
      const value = keyMap[event.key];
      handleInput(value);
    }
  });

  function handleInput(value) {
    if (value === "C") {
      clearDisplay();
    } else if (value === "←") {
      deleteLastCharacter();
    } else if (value === "=") {
      calculateResult();
    } else {
      appendToDisplay(value);
    }
  }

  function clearDisplay() {
    currentInput = "0";
    updateDisplay();
  }

  function deleteLastCharacter() {
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = "0";
    }
    updateDisplay();
  }

  function calculateResult() {
    try {
      currentInput = eval(currentInput.replace(/%/g, "/100")).toString();
    } catch (e) {
      currentInput = "Error";
    }
    updateDisplay();
  }

  function appendToDisplay(value) {
    if (currentInput === "0" && value !== ".") {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay();
  }

  function updateDisplay() {
    display.textContent = currentInput;
  }
});
