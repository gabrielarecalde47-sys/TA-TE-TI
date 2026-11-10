let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let juegoTerminado = false;
let partidas = 1;
let puntosX = 0;
let puntosO = 0;
let historialJugadas = [];
let quienEmpieza = "X";

const combinaciones = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const casillas = document.querySelectorAll(".cuadrado");
const mensaje = document.getElementById("mensaje");
const spanPuntosX = document.getElementById("puntosX");
const spanPuntosO = document.getElementById("puntosO");
const spanContadorPartidas = document.getElementById("contadorPartidas");
const botonReiniciar = document.getElementById("reiniciar");
const botonDeshacer = document.getElementById("deshacer");

function jugar(indice) {
  if (juegoTerminado || tablero[indice] !== "") {
    return;
  }

  tablero[indice] = turno;
  console.log("Tablero actual:", [...tablero]);

  historialJugadas.push(indice);

  casillas[indice].textContent = turno;
  if (turno === "X") {
    casillas[indice].classList.add("x");
  } else {
    casillas[indice].classList.add("o");
  }

  let combinacionGanadora = obtenerCombinacionGanadora();
  if (combinacionGanadora) {
    mensaje.textContent = "Ganó " + turno;
    mensaje.classList.add("ganador");
    juegoTerminado = true;

    combinacionGanadora.forEach(i => {
      casillas[i].classList.add("ganador-item");
    });

    if (turno === "X") {
      puntosX++;
      spanPuntosX.textContent = puntosX;
    } else {
      puntosO++;
      spanPuntosO.textContent = puntosO;
    }

  } else if (!tablero.includes("")) {
    mensaje.textContent = "Empate";
    juegoTerminado = true;
  } else {
    turno = (turno === "X") ? "0" : "X";
    mensaje.textContent = "Turno de: " + turno;
  }
}

function obtenerCombinacionGanadora() {
  for (let i = 0; i < combinaciones.length; i++) {
    const c = combinaciones[i];
    const ficha = tablero[c[0]];
    const igual1 = ficha === tablero[c[1]];
    const igual2 = ficha === tablero[c[2]];

    if (ficha !== "" && igual1 && igual2) {
      return c; 
    }
  }
  return null;
}

for (let i = 0; i < casillas.length; i++) {
  casillas[i].addEventListener("click", function () {
    jugar(i);
  });
}

botonDeshacer.addEventListener("click", function() {
  if (juegoTerminado || historialJugadas.length === 0) return;

  let ultimoIndice = historialJugadas.pop();
  tablero[ultimoIndice] = "";
  casillas[ultimoIndice].textContent = "";
  casillas[ultimoIndice].classList.remove("x", "o");

  turno = (turno === "X") ? "0" : "X";
  mensaje.textContent = "Turno de: " + turno;
  console.log("Deshacer jugada. Tablero:", [...tablero]);
});

function reiniciar() {
  for (let i = 0; i < tablero.length; i++) {
    tablero[i] = "";
    casillas[i].textContent = "";
    casillas[i].classList.remove("x", "o", "ganador-item");
  }
  
  partidas++;
  spanContadorPartidas.textContent = partidas;

  juegoTerminado = false;
  historialJugadas = [];
  mensaje.classList.remove("ganador");

  quienEmpieza = (quienEmpieza === "X") ? "0" : "X";
  turno = quienEmpieza;

  mensaje.textContent = `Turno de: ${turno}`;
}

botonReiniciar.addEventListener("click", reiniciar);
