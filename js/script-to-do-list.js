// Mapa de teclas y sus valores correspondientes
const keyMap = {
  a: "anotherValue",
  // Agrega tus teclas y valores aquí
};

// Recuperar tareas almacenadas al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarTareas();
});

// Manejar evento keydown
document.addEventListener("keydown", function (event) {
  // Si la tecla es 'Enter' y el usuario está en el input, agregar la tarea
  if (
    event.key === "Enter" &&
    document.activeElement.classList.contains("display-tareas")
  ) {
    agregarTarea();
  }

  // Si la tecla está en el keyMap y no está escribiendo en un input, manejar la entrada y prevenir el comportamiento por defecto
  if (
    keyMap.hasOwnProperty(event.key) &&
    document.activeElement.tagName !== "INPUT"
  ) {
    event.preventDefault();
    const value = keyMap[event.key];
    handleInput(value);
  }
});

function agregarTarea() {
  const nuevaTareaTexto = document.querySelector(".display-tareas").value;

  if (nuevaTareaTexto === "") {
    alert("Por favor, ingrese una tarea");
    return;
  }

  const nuevaTarea = document.createElement("li");

  const tareaTexto = document.createElement("span");
  tareaTexto.textContent = nuevaTareaTexto;

  const botonEliminar = document.createElement("button");
  botonEliminar.classList.add("boton-eliminar");

  const imgEliminar = document.createElement("img");
  imgEliminar.src = "/assets/delete-icon.svg";
  imgEliminar.alt = "Eliminar tarea";
  imgEliminar.classList.add("icono-eliminar");

  botonEliminar.appendChild(imgEliminar);

  botonEliminar.onclick = function () {
    nuevaTarea.remove();
    eliminarTareaLocalStorage(nuevaTareaTexto);
  };

  nuevaTarea.appendChild(tareaTexto);
  nuevaTarea.appendChild(botonEliminar);

  document.getElementById("listaTareas").appendChild(nuevaTarea);

  guardarTareaLocalStorage(nuevaTareaTexto);

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
  const tareas = obtenerTareasLocalStorage();
  tareas.forEach(function (tarea) {
    const nuevaTarea = document.createElement("li");

    const tareaTexto = document.createElement("span");
    tareaTexto.textContent = tarea;

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");

    const imgEliminar = document.createElement("img");
    imgEliminar.src = "/assets/delete-icon.svg";
    imgEliminar.alt = "Eliminar tarea";
    imgEliminar.classList.add("icono-eliminar");

    botonEliminar.appendChild(imgEliminar);

    botonEliminar.onclick = function () {
      nuevaTarea.remove();
      eliminarTareaLocalStorage(tarea);
    };

    nuevaTarea.appendChild(tareaTexto);
    nuevaTarea.appendChild(botonEliminar);

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

function handleInput(value) {
  // Aquí puedes manejar la entrada de teclado personalizada
  console.log(`Tecla presionada: ${value}`);
}
