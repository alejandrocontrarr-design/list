// Obtener las tareas guardadas del almacenamiento local (localStorage)
let tareasGuardadas = JSON.parse(localStorage.getItem('tasks')) || [];

// Crear un arreglo para guardar las tareas
let tareas = tareasGuardadas;

// Obtener los elementos del documento (HTML)
let entradaTarea = document.getElementById('taskInput');
let botonAgregar = document.getElementById('addBtn');
let listaTareas = document.getElementById('tasksList');

// Función para agregar una tarea nueva
function agregarTarea(texto) {
  // Quitar espacios en blanco al inicio y al final
  let textoLimpio = texto.trim();

  // Validar que el texto no esté vacío ni sea demasiado largo
  if (textoLimpio.length == 0 || textoLimpio.length > 10) {
    alert("No se permite texto vacío o mayor a 10 caracteres.");
    return; // Detiene la función si no pasa la validación
  }

  // Crear un objeto que representa la tarea
  let nuevaTarea = {
    text: textoLimpio,
    completed: false
  };

  // Agregar la tarea al arreglo
  tareas.push(nuevaTarea);

  // Guardar las tareas actualizadas
  guardarEnLocalStorage();

  // Mostrar las tareas en pantalla
  mostrarTareas();
}

// Función para marcar o desmarcar una tarea como completada
function cambiarEstadoTarea(indice) {
  tareas[indice].completed = !tareas[indice].completed;
  guardarEnLocalStorage();
  mostrarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(indice) {
  console.log(indice);
  tareas.splice(indice, 1); // Quita 1 elemento en la posición "indice"
  guardarEnLocalStorage();
  mostrarTareas();
}

// Función para guardar las tareas en el almacenamiento local
function guardarEnLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tareas));
}

// Función para mostrar las tareas en la lista
function mostrarTareas() {
  // Limpiar el contenido de la lista
  listaTareas.innerHTML = '';

  // Si no hay tareas, mostrar mensaje
  if (tareas.length == 0) {
    let elemento = document.createElement('li');
    elemento.className = 'list-group-item text-muted text-center';
    elemento.textContent = 'No hay tareas aún.';
    listaTareas.appendChild(elemento);
    return;
  }

  // Recorrer las tareas con un ciclo "for"
  for (let i = 0; i < tareas.length; i++) {
    let tarea = tareas[i];

    // Crear el elemento <li> para cada tarea
    let elemento = document.createElement('li');
    elemento.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Si la tarea está completada, agregarle una clase especial
    if (tarea.completed) {
      elemento.classList.add('completed');
    }

    // Crear el texto de la tarea
    let textoTarea = document.createElement('span');
    textoTarea.textContent = tarea.text;
    textoTarea.className = 'flex-grow-1';
    if (tarea.completed) {
      textoTarea.classList.add('completed');
    }

    // Crear botón para marcar como completada o desmarcar
    let botonEstado = document.createElement('button');
    botonEstado.className = 'btn btn-sm btn-outline-success';
    botonEstado.textContent = tarea.completed ? 'Desmarcar' : 'Completar';
    botonEstado.onclick = function () {
      cambiarEstadoTarea(i);
    };

    // Crear botón para eliminar
    let botonEliminar = document.createElement('button');
    botonEliminar.className = 'btn btn-sm btn-outline-danger ms-2';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = function () {
      eliminarTarea(i);
    };

    // Agregar los elementos al <li>
    elemento.appendChild(textoTarea);
    elemento.appendChild(botonEstado);
    elemento.appendChild(botonEliminar);

    // Agregar el <li> a la lista principal
    listaTareas.appendChild(elemento);
  }
}

// Evento para agregar tarea al hacer clic en el botón
botonAgregar.addEventListener('click', function () {
  agregarTarea(entradaTarea.value);
  entradaTarea.value = ''; // Limpia el campo de texto
  entradaTarea.focus(); // Coloca el cursor nuevamente en el input
});

// Evento para agregar tarea al presionar Enter
entradaTarea.addEventListener('keydown', function (evento) {
  if (evento.key === 'Enter') {
    botonAgregar.click();
  }
});

// Mostrar la lista de tareas al cargar la página
mostrarTareas();
