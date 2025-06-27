const form = document.getElementById('form-tarea');
const input = document.getElementById('input-tarea');
const lista = document.getElementById('lista-tareas');

// Cargar tareas guardadas en el storage al iniciar la app
document.addEventListener('DOMContentLoaded', cargarTareas);

form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = input.value.trim(); // catcheo la tarea
  if (texto !== "") {
    agregarTarea(texto); // la cargo si existe
    input.value = "";
  }
});

// Para listar las tareas que se van agregando. Con sus 2 funciones: completada/eliminar
function agregarTarea(texto) {
  const li = document.createElement('li');
  li.textContent = texto;

  // Botón para eliminar tarea
  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = '✕';
  btnEliminar.className = 'btn-eliminar';
  btnEliminar.onclick = () => {
    li.remove();
    guardarTareas();
  };

  // Tachar al completar
  li.addEventListener('click', () => {
    li.classList.toggle('completada');
    guardarTareas();
  });

  li.appendChild(btnEliminar);
  lista.appendChild(li);

  guardarTareas(); 
}

// update del storage array de tareas (key), y como value el array en json.
function guardarTareas() {
  const tareas = [];
  lista.querySelectorAll('li').forEach(li => {
    tareas.push({
      texto: li.firstChild.textContent.trim(),
      completada: li.classList.contains('completada')
    });
  });
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.texto;
    if (t.completada) li.classList.add('completada');

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '✕';
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.onclick = () => {
      li.remove();
      guardarTareas();
    };

    // switch de la clase "completada"
    li.addEventListener('click', () => {
      li.classList.toggle('completada');
      guardarTareas();
    });

    li.appendChild(btnEliminar); //agrego eliminar a la tarea
    lista.appendChild(li); //agrego la tarea al listado
  });
}
