const lista = document.getElementById('menu-lista');
const botones = document.querySelectorAll('.filtros button');
let datosMenu = [];

// Carga el JSON
fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    datosMenu = data;
    mostrarMenu("Todos");
  });

function mostrarMenu(categoria) {
  lista.innerHTML = '';

  const filtro = categoria === "Todos"
    ? datosMenu
    : datosMenu.filter(item => item.categoria === categoria);

  filtro.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item');

    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="item-info">
        <h3>${item.nombre}</h3>
        <p>$${item.precio}</p>
      </div>
    `;

    lista.appendChild(div);
  });
}

// Botones de filtrado
botones.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remuevo activo de todos los botones
    botones.forEach(b => b.classList.remove('activo'));
    // Marco como activo el actual
    btn.classList.add('activo');

    const categoria = btn.getAttribute('data-categoria');
    mostrarMenu(categoria);
  });
});

// filtros del dropdown
const filtroSelect = document.querySelector('.filtros-select');

filtroSelect.addEventListener('change', () => {
  mostrarMenu(filtroSelect.value);
});

