let turno = "X";
let estadode = ["", "", "", "", "", "", "", "", ""];
let juegoActivo = true;

const mensajeUI = document.getElementById("mensaje");

const tateti = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

for (let i = 0; i < 9; i++) {
    let caja = document.querySelector(`.cuadrado[data-index='${i}']`);
    
    caja.addEventListener("click", () => {
        if (estadode[i] === "" && juegoActivo) {
            console.log(`Hiciste click en el cuadrado ${i}`);
            
            estadode[i] = turno;
            caja.innerHTML = turno;
            
            verificarGanador();
            
            if (juegoActivo) {
                turno = turno === "X" ? "O" : "X";
                mensajeUI.innerHTML = `Turno de: ${turno}`;
            }
        }
    });
}

function verificarGanador() {
    let haGanado = false;

    for (let i = 0; i < tateti.length; i++) {
        const [a, b, c] = tateti[i];
        if (estadode[a] && estadode[a] === estadode[b] && estadode[a] === estadode[c]) {
            haGanado = true;
            break;
        }
    }

    if (haGanado) {
        mensajeUI.innerHTML = `🎉 ¡VICTORIA DE ${turno}! 🎉`;
        mensajeUI.classList.add("ganador");
        juegoActivo = false;
        return;
    }

    if (!estadode.includes("")) {
        mensajeUI.innerHTML = "⚡ ¡EMPATE ! ⚡";
        mensajeUI.classList.add("ganador");
        juegoActivo = false;
    }
}