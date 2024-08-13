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

// Recuperar tareas almacenadas al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarTareas();
});

function agregarTarea() {
  // Obtener el valor del campo de la tarea
  const nuevaTareaTexto = document.querySelector(".display-tareas").value;

  // Validar que el valor no sea vacío
  if (nuevaTareaTexto === "") {
    alert("Por favor, ingrese una tarea");
    return;
  }

  // Crear un elemento en la lista
  const nuevaTarea = document.createElement("li");
  nuevaTarea.textContent = nuevaTareaTexto + " ";

  // Crear botón eliminar
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "X";
  botonEliminar.onclick = function () {
    nuevaTarea.remove();
    // Eliminar tarea de Local Storage
    eliminarTareaLocalStorage(nuevaTareaTexto);
  };

  // Agregar botón de eliminar al elemento de la lista
  nuevaTarea.appendChild(botonEliminar);

  // Agregar los elementos en la lista final
  document.getElementById("listaTareas").appendChild(nuevaTarea);

  // Guardar tarea en Local Storage
  guardarTareaLocalStorage(nuevaTareaTexto);

  // Limpiar el cuadro de texto del nombre de la tarea
  document.querySelector(".display-tareas").value = "";
}

function guardarTareaLocalStorage(tarea) {
  let tareas = obtenerTareasLocalStorage();
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function obtenerTareasLocalStorage() {
  let tareas;
  if (localStorage.getItem("tareas") === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  return tareas;
}

function cargarTareas() {
  let tareas = obtenerTareasLocalStorage();
  tareas.forEach(function (tarea) {
    // Crear un elemento en la lista
    const nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = tarea + " ";

    // Crear botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "X";
    botonEliminar.onclick = function () {
      nuevaTarea.remove();
      // Eliminar tarea de Local Storage
      eliminarTareaLocalStorage(tarea);
    };

    // Agregar botón de eliminar al elemento de la lista
    nuevaTarea.appendChild(botonEliminar);

    // Agregar los elementos en la lista final
    document.getElementById("listaTareas").appendChild(nuevaTarea);
  });
}

function eliminarTareaLocalStorage(tarea) {
  let tareas = obtenerTareasLocalStorage();
  tareas = tareas.filter(function (t) {
    return t !== tarea;
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
