// Obtener tareas del localStorage si existen
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
// Array para guardar las tareas
const tasks = storedTasks;

// Elementos del DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');

// Función para agregar tarea
function addTask(text) {
  const texto_limpio = text.trim();
  if (texto_limpio.length == 0 || texto_limpio.length > 10){
    alert("no se permite texto vacio o mayor a 10");
    return; // Evita agregar vacíos
  } 
  const task = { text: texto_limpio, completed: false };
  tasks.push(task);
  saveToLocalStorage();
  renderTasks();
}

// Función para marcar tarea como completada
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveToLocalStorage();
  renderTasks();
}

// Función para eliminar tarea
function deleteTask(index) {
  // Eliminar la tarea del array
  tasks.splice(index, 1);
  // Guardar el array actualizado en localStorage
  saveToLocalStorage();
  // Renderizar la lista de tareas de nuevo
  renderTasks();
}

// Función para guardar tareas en localStorage
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para mostrar tareas
function renderTasks() {
  tasksList.innerHTML = '';

  if (tasks.length === 0) {
    const li = document.createElement('li');
    li.className = 'list-group-item text-muted text-center';
    li.textContent = 'No hay tareas aún.';
    tasksList.appendChild(li);
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`;

    // Tarea y botón de marcar como completada
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.className = `flex-grow-1 ${task.completed ? 'completed' : ''}`;

    
    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-sm btn-outline-success';
    checkBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
    checkBtn.onclick = () => toggleCompletion(index);

    // Botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-outline-danger ms-2';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(taskText);
    li.appendChild(checkBtn);
    li.appendChild(deleteBtn);

    tasksList.appendChild(li);
  });
}

// Evento para agregar tarea con botón
addBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = ''; // limpia el input
  taskInput.focus();
});

// Agregar tarea con Enter
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// Mostrar lista de tareas al inicio
renderTasks();
