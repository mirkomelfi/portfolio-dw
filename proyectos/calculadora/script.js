// Me traigo la pantalla donde haré los innertxt
const pantalla = document.getElementById('pantalla');

// Selecciono todos los button dentro del contenedor .botones
const botones = document.querySelectorAll('.botones button');

// Recorremos cada botón para asignarle su evento
botones.forEach(btn => {
  const valor = btn.dataset.valor;     // Para botones de número u operador
  const accion = btn.dataset.accion;   // Para botones funcionales como C o =

  // Si tiene un valor inserto en la pantalla
  if (valor) {
    btn.addEventListener('click', () => insertar(valor));
  }

  // Si tiene una acción, ejecuto la función correspondiente
  if (accion) {
    btn.addEventListener('click', () => {
      switch (accion) {
        case "limpiar":
          limpiar();
          break;
        case "borrar":
          borrar();
          break;
        case "calcular":
          calcular();
          break;
        case "raiz":
          raiz();
          break;
      }
    });
  }
});

// Agrego un número o símbolo a la pantalla que ve el usr
function insertar(valor) {
  if (pantalla.innerText === "0") pantalla.innerText = "";
  pantalla.innerText += valor;
}

// Rresetea pantalla a 0
function limpiar() {
  pantalla.innerText = "0";
}

// Borro ult char
function borrar() {
  if (pantalla.innerText.length > 1) {
    pantalla.innerText = pantalla.innerText.slice(0, -1); 
  } else {
    pantalla.innerText = "0";
  }
}

// Calcular rdo 
function calcular() {
  try {
    // Reemplaza % por /100 para manejar porcentajes
    let resultado = eval(pantalla.innerText.replace('%', '/100')); // uso eval xq no hay forma de alterar el input por el usr
    pantalla.innerText = resultado;
  } catch (e) {
    pantalla.innerText = "Error";
  }
}

// Raíz cuadrada
function raiz() {
  try {
    let valor = eval(pantalla.innerText);
    pantalla.innerText = Math.sqrt(valor);
  } catch (e) {
    pantalla.innerText = "Error";
  }
}
