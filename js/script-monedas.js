document.addEventListener("DOMContentLoaded", function () {
  // Funciones para generar caracteres aleatorios
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+{}[]<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Función principal para generar la contraseña
  function generatePassword(
    length,
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols
  ) {
    let generatedPassword = "";
    const typesCount =
      includeUpper + includeLower + includeNumbers + includeSymbols;
    const typesArray = [
      { includeUpper },
      { includeLower },
      { includeNumbers },
      { includeSymbols },
    ].filter((item) => Object.values(item)[0]);

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      typesArray.forEach((type) => {
        const funcName = Object.keys(type)[0];
        if (funcName === "includeUpper") {
          generatedPassword += getRandomUpper();
        } else if (funcName === "includeLower") {
          generatedPassword += getRandomLower();
        } else if (funcName === "includeNumbers") {
          generatedPassword += getRandomNumber();
        } else if (funcName === "includeSymbols") {
          generatedPassword += getRandomSymbol();
        }
      });
    }

    return generatedPassword.slice(0, length);
  }

  // Evento para generar la contraseña cuando se hace clic en el botón "Generar"
  document.getElementById("generate").addEventListener("click", () => {
    const length = +document.getElementById("length").value;
    const includeUpper = document.getElementById("uppercase").checked;
    const includeLower = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    const password = generatePassword(
      length,
      includeUpper,
      includeLower,
      includeNumbers,
      includeSymbols
    );
    document.getElementById("password").textContent = password;
  });

  // Evento para copiar la contraseña al portapapeles
  document.getElementById("copy").addEventListener("click", () => {
    const password = document.getElementById("password").textContent;

    if (!password) {
      alert("No hay contraseña generada para copiar.");
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Contraseña copiada al portapapeles");
  });
});
