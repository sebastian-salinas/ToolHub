const conversionFactors = {
  caudal: {
    "m³/s": 1,
    "cm³/s": 1000000,
    "ft³/h": 127132.811835,
    "ft³/min": 2118.88,
    "ft³/s": 35.3147,
    "gal/h (US)": 953020,
    "gal/min (US)": 15850.3,
    "in³/min": 3661420,
    "in³/s": 61023.7,
    "L/h": 3600000,
    "L/min": 60000,
    "L/s": 1000,
    "m³/h": 3600,
    "m³/min": 60,
    "yd³/h": 4708.60780593,
    "yd³/in": 78.4769753655,
    "yd³/s": 1.30795954836,
  },
  densidad: {
    "kg/m³": 1,
    "g/cm³": 0.001,
    "g/L": 1,
    "g/m³": 1000,
    "g/ml³": 0.001,
    "g/mm³": 0.000001,
    "kg/cm³": 0.000001,
    "kg/L": 0.001,
    "lb/ft³": 0.06242796,
    "lb/in³": 3.61273e-5,
    "lb/gal (UK)": 0.0100224,
    "lb/gal (US)": 0.0083454,
    "mg/cm³": 1000,
    "mg/l": 1000,
    "mg/m³": 1000000,
    "oz/gal (UK)": 0.160358,
    "oz/gal (US)": 0.133526,
    "t/m³": 0.001,
  },
  volumen: {
    "m³": 1,
    cl: 100000,
    "cm³": 1000000,
    dl: 10000,
    "dm³": 1000,
    "ft³": 35.3147,
    "gal (UK)": 220,
    "gal (US)": 264.172,
    "in³": 61023.7,
    L: 1000,
    mL: 1000000,
    "yd³": 1.308,
  },
  energia: {
    J: 1,
    Btu: 9.478e-4,
    erg: 10000000,
    cal: 0.2388,
    "ft lbf": 0.73746312684,
    "in lbf": 8.850745791,
    kgfm: 0.10197,
    kcal: 0.0002388,
    kJ: 0.001,
    "kW/h": 2.77778e-7,
    th: 2.38845896e-7,
    tec: 3.41143e-11,
    tep: 2.388e-11,
    toe: 2.388e-11,
    "W/h": 0.00027777,
    "W/s": 1,
  },
  longitud: {
    m: 1,
    cm: 100,
    ft: 3.28083,
    in: 39.37007,
    km: 0.001,
    mi: 0.000621371192,
    nmi: 0.000539957,
    mm: 1000,
    yd: 1,
  },
  masa: {
    kg: 1,
    g: 1000,
    mg: 1000000,
    lb: 2.20462,
    oz: 35.274,
    "ton (metric)": 0.001,
    "ton (US)": 0.00110231,
    st: 0.157473,
    ct: 5000,
    gr: 15432.4,
  },
  presion: {
    Pa: 1,
    at: 4.4,
    atm: 9.86923e-6,
    bar: 1e-5,
    inH2O: 0.00401463,
    inHg: 0.0002953,
    kPa: 0.001,
    "lbf/ft²": 0.0208855472,
    "lbf/in²": 0.0208855472,
    mbar: 0.01,
    mca: 0.0001020408,
    cmca: 0.01020408,
    mmca: 0.1020408,
    mmHg: 0.00750062,
    MPa: 1e-6,
    "N/mm²": 1e-6,
    psi: 0.000145038,
    torr: 0.00750062,
  },
  velocidad: {
    "m/s": 1,
    "km/h": 3.6,
    "mi/h": 2.23694,
    "ft/s": 3.28084,
    "in/s": 39.3701,
    knot: 1.94384,
    mph: 2.23694,
    "ft/min": 196.85,
    "cm/s": 100,
    "mm/s": 1000,
  },
  temperatura: {
    ºC: 1,
    ºF: 33.8,
    K: 274.15,
    ºR: 493.47,
  },
  potencia: {
    W: 1,
    kW: 0.001,
    MW: 1e-6,
    "hp (metric)": 0.00135962,
    "hp (US)": 0.00134102,
    "BTU/h": 3.41214,
    "cal/s": 0.238846,
    "kcal/h": 0.859845,
    "ft-lb/s": 0.737562,
    "J/s": 1,
  },
  par: {
    Nm: 1,
    kgm: 0.101972,
    "lb-ft": 0.737562,
    "lb-in": 8.85075,
    "dyn-m": 100000,
    "gf-m": 10197.2,
    "kgf-cm": 1019.72,
    "N-cm": 100,
    "mN-m": 1000,
    cP: 1e-7,
  },
  fuerza: {
    N: 1,
    kN: 0.001,
    MN: 1e-6,
    kgf: 0.101972,
    lbf: 0.224809,
    dyn: 100000,
    gf: 101.972,
    ozf: 3.59694,
    kip: 0.000224809,
    tonf: 0.000112404,
  },
  area: {
    "m²": 1,
    "cm²": 10000,
    "mm²": 1e6,
    "km²": 1e-6,
    ha: 0.0001,
    acre: 0.000247105,
    "ft²": 10.7639,
    "in²": 1550,
    "yd²": 1.19599,
    "mi²": 3.861e-7,
  },
  tiempo: {
    s: 1,
    mes: 1,
    año: 1,
    semana: 1.65344e-6,
    día: 1.15741e-5,
    h: 0.000277778,
    min: 0.166667,
    ds: 10,
    cs: 100,
    ms: 1000,

    bimestre: 0.5,
    trimestre: 0.333,
    cuatrimestre: 0.25,
    semestre: 0.166667,
    año: 0.08333,

    bienio: 0.5,
    trienio: 0.333,
    cuatrienio: 0.25,
    lustro: 0.2,
    sexenio: 0.166667,
    septenio: 0.14285,
    década: 0.1,
    decalustro: 0.02,
    siglo: 0.01,
    milenio: 0.001,
  },
};

function populateUnits() {
  const category = document.getElementById("category").value;
  const fromUnitSelect = document.getElementById("fromUnit");
  const toUnitSelect = document.getElementById("toUnit");

  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";

  for (let unit in conversionFactors[category]) {
    let option1 = document.createElement("option");
    option1.value = unit;
    option1.textContent = unit;
    fromUnitSelect.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = unit;
    option2.textContent = unit;
    toUnitSelect.appendChild(option2);
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

  const convertedValue = (inputValue / factorFrom) * factorTo;

  result.textContent = `${inputValue} ${fromUnit} = ${formatNumber(
    convertedValue
  )} ${toUnit}`;
}

function formatNumber(value) {
  if (value < 1) {
    return value.toPrecision(4); // Para valores menores que 1, mostrar hasta 4 dígitos significativos
  } else {
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 }); // Para valores mayores que 1, mostrar hasta 6 decimales
  }
}

document.addEventListener("DOMContentLoaded", function () {
  populateUnits();
  document.getElementById("convertButton").addEventListener("click", convert);
});
