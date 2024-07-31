const apiKey = "cff839cd52ac6497864608e1"; // Reemplaza 'TU_CLAVE_DE_API' con tu clave real
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener("DOMContentLoaded", function () {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.conversion_rates);
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = currency;
        option1.text = currency;
        option2.value = currency;
        option2.text = currency;
        fromCurrency.add(option1);
        toCurrency.add(option2);
      });
    });

  document.getElementById("convert").addEventListener("click", function () {
    const amount = document.getElementById("amount").value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rate;
        const result = amount * rate;
        document.getElementById(
          "result"
        ).innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
      })
      .catch((error) => console.error("Error:", error));
  });
});
