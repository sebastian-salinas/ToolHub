document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "0";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (value === "C") {
        clearDisplay();
      } else if (value === "←") {
        deleteLastCharacter();
      } else if (value === "=") {
        calculateResult();
      } else {
        appendToDisplay(value);
      }
    });
  });

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
