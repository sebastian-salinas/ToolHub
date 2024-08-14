// main.js
document.addEventListener("DOMContentLoaded", function () {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const amountInput = document.getElementById("amount");
  const resultDiv = document.getElementById("result");

  fetch("http://localhost:3000/api/currencies")
    .then((response) => response.json())
    .then((data) => {
      Object.keys(data).forEach((currency) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = currency;
        option1.text = currency;
        option2.value = currency;
        option2.text = currency;
        fromCurrency.add(option1);
        toCurrency.add(option2);
      });
    })
    .catch((error) => console.error("Error:", error));

  document.getElementById("convert").addEventListener("click", function () {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(
      `http://localhost:3000/api/convert?from=${from}&to=${to}&amount=${amount}`
    )
      .then((response) => response.json())
      .then((data) => {
        resultDiv.innerText = `${amount} ${from} = ${data.result} ${to}`;
      })
      .catch((error) => console.error("Error:", error));
  });
});
