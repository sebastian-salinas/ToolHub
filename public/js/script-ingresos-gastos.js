// Variables globales
let totalIncome = 0;
let totalExpenses = 0;

// Cargar datos del localStorage al iniciar
document.addEventListener("DOMContentLoaded", loadSavedData);

function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemCategory = document.getElementById("itemCategory").value;
  const itemAmount = parseFloat(document.getElementById("itemAmount").value);

  if (!itemName || isNaN(itemAmount) || itemAmount <= 0) {
    alert("Por favor, ingrese valores válidos.");
    return;
  }

  // Agregar el nuevo item al historial
  const item = {
    name: itemName,
    category: itemCategory,
    amount: itemAmount,
  };

  // Actualizar el historial en el localStorage
  updateLocalStorage(item);
  addToHistory(item);

  // Actualizar resultados
  updateResults();

  // Limpiar el formulario
  document.getElementById("budgetForm").reset();
}

function updateResults() {
  const balance = totalIncome - totalExpenses;

  document.getElementById("totalIncome").textContent = `$${totalIncome.toFixed(
    2
  )}`;
  document.getElementById(
    "totalExpenses"
  ).textContent = `$${totalExpenses.toFixed(2)}`;
  document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;

  // Log para verificar los totales
  console.log("Total Ingresos:", totalIncome);
  console.log("Total Gastos:", totalExpenses);
  console.log("Balance:", balance);
}

function addToHistory(item) {
  const historyList = document.getElementById("historyList");

  // Crear un nuevo elemento de lista
  const listItem = document.createElement("li");
  listItem.textContent = `${item.name} - ${
    item.category
  } - $${item.amount.toFixed(2)}`;

  // Crear botón de eliminar
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("boton-eliminar");

  const imgEliminar = document.createElement("img");
  imgEliminar.src = "/public/assets/delete-icon.svg";
  imgEliminar.alt = "Eliminar tarea";
  imgEliminar.classList.add("icono-eliminar");

  deleteButton.appendChild(imgEliminar);
  deleteButton.onclick = () => {
    removeItem(item, listItem);
  };

  listItem.appendChild(deleteButton);
  historyList.appendChild(listItem);
}

function updateLocalStorage(item) {
  // Cargar el historial existente
  let history = JSON.parse(localStorage.getItem("budgetHistory")) || [];

  // Agregar nuevo item
  history.push(item);
  localStorage.setItem("budgetHistory", JSON.stringify(history));

  // Actualizar totales
  if (item.category === "Ingreso") {
    totalIncome += item.amount;
  } else if (item.category === "Gasto") {
    totalExpenses += item.amount;
  }

  // Guardar los totales
  localStorage.setItem("totalIncome", totalIncome);
  localStorage.setItem("totalExpenses", totalExpenses);
}

function loadSavedData() {
  // Verificación y carga de datos del localStorage
  totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
  totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;

  console.log("Cargando datos...");
  console.log("Total Ingresos Inicial:", totalIncome);
  console.log("Total Gastos Inicial:", totalExpenses);

  const history = JSON.parse(localStorage.getItem("budgetHistory")) || [];

  history.forEach((item) => addToHistory(item));
  updateResults();
}

function removeItem(itemToRemove, listItem) {
  // Cargar historial del localStorage
  let history = JSON.parse(localStorage.getItem("budgetHistory")) || [];

  // Filtrar el item a eliminar
  history = history.filter(
    (item) =>
      item.name !== itemToRemove.name ||
      item.category !== itemToRemove.category ||
      item.amount !== itemToRemove.amount
  );

  // Actualizar localStorage
  localStorage.setItem("budgetHistory", JSON.stringify(history));

  // Actualizar los totales
  if (itemToRemove.category === "Ingreso") {
    totalIncome -= itemToRemove.amount;
  } else if (itemToRemove.category === "Gasto") {
    totalExpenses -= itemToRemove.amount;
  }

  localStorage.setItem("totalIncome", totalIncome);
  localStorage.setItem("totalExpenses", totalExpenses);

  // Eliminar el elemento visualmente
  listItem.remove();

  // Actualizar los resultados visuales
  updateResults();
}
