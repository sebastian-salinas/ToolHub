// converter.js

const conversionFactors = {
  caudal: {
    "m³/s": 1,
    "ft³/s": 0.0283168,
    "l/s": 0.001,
    "gal/min": 0.0000630902,
    "m³/min": 0.0166667,
    "ft³/min": 0.000471947,
    "l/min": 0.0000166667,
    "gal/h": 0.0000010515,
    "m³/h": 0.000277778,
    "ft³/h": 0.00000786579,
  },
  densidad: {
    "kg/m³": 1,
    "g/cm³": 1000,
    "lb/ft³": 16.0185,
    "lb/gal": 119.826,
    "kg/l": 1000,
    "g/l": 1,
    "lb/in³": 27679.9,
    "oz/in³": 1729.99,
    "oz/gal": 7.48915,
    "g/ml": 1000,
  },
  volumen: {
    "m³": 1,
    "cm³": 1e-6,
    litro: 0.001,
    mililitro: 1e-6,
    "ft³": 0.0283168,
    "in³": 1.63871e-5,
    galón: 0.00378541,
    cuarto: 0.000946353,
    "onza líquida": 2.9574e-5,
    taza: 0.000236588,
  },
  masa: {
    kg: 1,
    g: 0.001,
    mg: 1e-6,
    tonelada: 1000,
    lb: 0.453592,
    oz: 0.0283495,
    stone: 6.35029,
    "ton corta": 907.185,
    "ton larga": 1016.05,
    carat: 0.0002,
  },
  presion: {
    Pa: 1,
    kPa: 1000,
    MPa: 1e6,
    bar: 1e5,
    atm: 101325,
    psi: 6894.76,
    Torr: 133.322,
    mmHg: 133.322,
    inHg: 3386.39,
    cmH2O: 98.0665,
    mmH2O: 9.80665,
  },
  velocidad: {
    "m/s": 1,
    "km/h": 0.277778,
    "mi/h": 0.44704,
    "ft/s": 0.3048,
    kn: 0.514444,
    mach: 343,
    c: 299792458,
    "cm/s": 0.01,
    "in/s": 0.0254,
    "mm/s": 0.001,
  },
  potencia: {
    W: 1,
    kW: 1000,
    HP: 745.7,
    CV: 735.5,
    "cal/s": 4.184,
    "BTU/h": 0.293071,
    "ft-lb/s": 1.35582,
    "erg/s": 1e-7,
    "J/s": 1,
    PS: 735.5,
  },
  par: {
    "N·m": 1,
    "kg·m": 9.80665,
    "lb·ft": 1.35582,
    "lb·in": 0.113,
    "oz·in": 0.00706,
    "dyn·cm": 1e-7,
    "gf·cm": 0.0000980665,
    "kgf·m": 9.80665,
    "gf·m": 0.00980665,
    "N·cm": 0.01,
  },
  fuerza: {
    N: 1,
    kN: 1000,
    lbf: 4.44822,
    dyne: 1e-5,
    kgf: 9.80665,
    gf: 0.00980665,
    kip: 4448.22,
    ozf: 0.2780139,
    poundal: 0.138255,
    sthene: 1000,
  },
  area: {
    "m²": 1,
    "cm²": 0.0001,
    "mm²": 1e-6,
    "km²": 1e6,
    "ft²": 0.092903,
    "in²": 0.00064516,
    acre: 4046.86,
    hectárea: 10000,
    "yd²": 0.836127,
    "mi²": 2.58999e6,
  },
};

function populateUnits() {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  for (let unit in conversionFactors[category]) {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");
    optionFrom.value = unit;
    optionFrom.textContent = unit;
    optionTo.value = unit;
    optionTo.textContent = unit;
    fromUnit.appendChild(optionFrom);
    toUnit.appendChild(optionTo);
  }
}

function convert() {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const inputValue = parseFloat(document.getElementById("inputValue").value);
  const result = document.getElementById("result");

  if (isNaN(inputValue)) {
    result.textContent = "Por favor, ingrese un valor válido.";
    return;
  }

  const factorFrom = conversionFactors[category][fromUnit];
  const factorTo = conversionFactors[category][toUnit];

  const convertedValue = (inputValue * factorFrom) / factorTo;
  result.textContent = `${inputValue} ${fromUnit} = ${convertedValue.toFixed(
    4
  )} ${toUnit}`;
}

document.addEventListener("DOMContentLoaded", function () {
  populateUnits();
});
