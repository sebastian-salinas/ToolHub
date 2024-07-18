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

document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category");
  const inputUnitSelect = document.getElementById("inputUnit");
  const outputUnitSelect = document.getElementById("outputUnit");
  const inputValue = document.getElementById("inputValue");
  const outputValue = document.getElementById("outputValue");
  const convertBtn = document.getElementById("convertBtn");

  const units = {
    area: {
      "metro cuadrado (m²)": 1,
      "kilómetro cuadrado (km²)": 1e-6,
      "milla cuadrada (mi²)": 3.861e-7,
      "yarda cuadrada (yd²)": 1.19599,
      "pie cuadrado (ft²)": 10.7639,
      "pulgada cuadrada (in²)": 1550.003,
      "hectárea (ha)": 1e-4,
      "acre (ac)": 0.000247105,
      "centímetro cuadrado (cm²)": 10000,
      "milímetro cuadrado (mm²)": 1e6,
    },
    caudal: {
      "metro cúbico por segundo (m³/s)": 1,
      "litro por segundo (L/s)": 1000,
      "pie cúbico por segundo (ft³/s)": 35.3147,
      "galón por minuto (gpm)": 15850.3,
      "litro por minuto (L/min)": 60000,
      "metro cúbico por hora (m³/h)": 3600,
    },
    densidad: {
      "kilogramo por metro cúbico (kg/m³)": 1,
      "gramo por centímetro cúbico (g/cm³)": 0.001,
      "libra por pie cúbico (lb/ft³)": 0.06242796,
      "gramo por litro (g/L)": 1,
      "kilogramo por litro (kg/L)": 0.001,
    },
    fuerza: {
      "newton (N)": 1,
      "kilonewton (kN)": 0.001,
      "libra-fuerza (lbf)": 0.224809,
      "kilogramo-fuerza (kgf)": 0.101972,
      "dyne (dyn)": 100000,
    },
    masa: {
      "kilogramo (kg)": 1,
      "gramo (g)": 1000,
      "miligramo (mg)": 1e6,
      "libra (lb)": 2.20462,
      "onza (oz)": 35.274,
      "tonelada métrica (t)": 0.001,
      "tonelada corta (US ton)": 0.00110231,
      "tonelada larga (UK ton)": 0.000984207,
    },
    par: {
      "newton metro (Nm)": 1,
      "kilogramo metro (kgm)": 0.101972,
      "libra pie (lbft)": 0.737562,
    },
    potencia: {
      "vatio (W)": 1,
      "kilovatio (kW)": 0.001,
      "caballo de fuerza (hp)": 0.00134102,
      "BTU por hora (BTU/h)": 3.41214,
    },
    presion: {
      "pascal (Pa)": 1,
      "kilopascal (kPa)": 0.001,
      "bar (bar)": 1e-5,
      "libra por pulgada cuadrada (psi)": 0.000145038,
      "atmósfera (atm)": 9.86923e-6,
      "milímetro de mercurio (mmHg)": 0.00750062,
    },
    velocidad: {
      "metro por segundo (m/s)": 1,
      "kilómetro por hora (km/h)": 3.6,
      "milla por hora (mph)": 2.23694,
      "pie por segundo (ft/s)": 3.28084,
      "nudo (kt)": 1.94384,
    },
    volumen: {
      "metro cúbico (m³)": 1,
      "litro (L)": 1000,
      "mililitro (mL)": 1e6,
      "pie cúbico (ft³)": 35.3147,
      "pulgada cúbica (in³)": 61023.7,
      "galón (gal)": 264.172,
      "onza líquida (fl oz)": 33814,
    },
  };

  function populateUnitSelect(category) {
    inputUnitSelect.innerHTML = "";
    outputUnitSelect.innerHTML = "";
    const categoryUnits = units[category];
    for (const unit in categoryUnits) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = unit;
      option1.textContent = unit;
      option2.value = unit;
      option2.textContent = unit;
      inputUnitSelect.appendChild(option1);
      outputUnitSelect.appendChild(option2);
    }
  }

  categorySelect.addEventListener("change", () => {
    populateUnitSelect(categorySelect.value);
  });

  convertBtn.addEventListener("click", () => {
    const category = categorySelect.value;
    const inputUnit = inputUnitSelect.value;
    const outputUnit = outputUnitSelect.value;
    const inputValueNumber = parseFloat(inputValue.value);

    if (isNaN(inputValueNumber)) {
      outputValue.value = "Entrada no válida";
      return;
    }

    const inputFactor = units[category][inputUnit];
    const outputFactor = units[category][outputUnit];
    const result = (inputValueNumber * inputFactor) / outputFactor;

    outputValue.value = result.toLocaleString(undefined, {
      maximumFractionDigits: 8,
    });
  });

  // Inicializar los selects de unidad con la primera categoría por defecto
  populateUnitSelect(categorySelect.value);
});
