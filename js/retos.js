

/* ---------------- RETOS ---------------- */

let nivelActual = 0;
let puntaje = 0;
let tiempo = 0;
let intervaloTiempo = null;

const problemasNivel1 = [
    { p: "7 + 5 =", r: "12" },
    { p: "9 - 4 =", r: "5" },
    { p: "6 × 3 =", r: "18" }
];

const problemasNivel2 = [
    { p: "2x + 4 = 10 → x =", r: "3" },
    { p: "5x - 5 = 20 → x =", r: "5" },
    { p: "3x = 21 → x =", r: "7" }
];

const problemasNivel3 = [
    { p: "x² - 5x + 6 → factores:", r: "(x-2)(x-3)" },
    { p: "x² + 3x + 2 → factores:", r: "(x+1)(x+2)" },
    { p: "x² - 9 → factores:", r: "(x-3)(x+3)" }
];

let ejercicios = [];
let index = 0;

function iniciarReto(nivel) {
    nivelActual = nivel;
    puntaje = 0;
    index = 0;

    document.querySelector(".retos-container").classList.add("oculto");
    document.getElementById("resultado").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");

    const titulo = document.getElementById("titulo-reto");
    const instrucciones = document.getElementById("instrucciones");

    if (nivel === 1) {
        ejercicios = problemasNivel1;
        tiempo = 30;
        titulo.textContent = "Nivel 1 — Operaciones básicas";
        instrucciones.textContent = "Resuelve los ejercicios lo más rápido posible.";
    } else if (nivel === 2) {
        ejercicios = problemasNivel2;
        tiempo = 45;
        titulo.textContent = "Nivel 2 — Ecuaciones lineales";
        instrucciones.textContent = "Mientras más rápido contestes, más puntos ganas.";
    } else {
        ejercicios = problemasNivel3;
        tiempo = 60;
        titulo.textContent = "Nivel 3 — Factorización";
        instrucciones.textContent = "Si aciertas todas, ganas una medalla.";
    }

    mostrarProblema();
    iniciarTiempo();
}

function iniciarContrarreloj() {
    nivelActual = 99;
    puntaje = 0;
    tiempo = 60;

    document.querySelector(".retos-container").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");

    document.getElementById("titulo-reto").textContent = "Contrarreloj";
    document.getElementById("instrucciones").textContent =
        "Resuelve la mayor cantidad posible en 60 segundos.";

    ejercicios = problemasNivel1.concat(problemasNivel2, problemasNivel3);

    mostrarProblema();
    iniciarTiempo();
}

/* ---------------- FUNCIONAMIENTO DEL JUEGO ---------------- */

function mostrarProblema() {
    const problema = ejercicios[index].p;
    document.getElementById("problema").textContent = problema;
}

function verificarRespuesta() {
    const respuesta = document.getElementById("respuesta").value.trim();
    if (respuesta === ejercicios[index].r) {
        puntaje++;
    }

    index++;

    if (index >= ejercicios.length && nivelActual !== 99) {
        terminarJuego();
        return;
    }

    if (nivelActual === 99) {
        ejercicios.sort(() => Math.random() - 0.5);
    }

    document.getElementById("respuesta").value = "";
    mostrarProblema();
}

function iniciarTiempo() {
    clearInterval(intervaloTiempo);

    intervaloTiempo = setInterval(() => {
        tiempo--;
        document.getElementById("tiempo").textContent = "Tiempo: " + tiempo + "s";
        document.getElementById("puntaje").textContent = "Puntaje: " + puntaje;

        if (tiempo <= 0) {
            terminarJuego();
        }
    }, 1000);
}

function terminarJuego() {
    clearInterval(intervaloTiempo);

    document.getElementById("juego").classList.add("oculto");
    document.getElementById("resultado").classList.remove("oculto");

    let mensaje = `Tu puntaje final es ${puntaje}. `;

    if (nivelActual === 3 && puntaje === ejercicios.length) {
        mensaje += "🏅 ¡Ganaste medalla de oro por resolver todo perfecto!";
    } else if (nivelActual === 99) {
        mensaje += "¡Buen trabajo en el contrarreloj!";
    }

    document.getElementById("mensaje-final").textContent = mensaje;
}

function reiniciar() {
    document.getElementById("resultado").classList.add("oculto");
    document.getElementById("juego").classList.add("oculto");
    document.querySelector(".retos-container").classList.remove("oculto");
}
function abrirReto(num){
    document.getElementById("reto-" + num).style.display = "block";
    window.scrollTo(0, 0);
}

function cerrarReto(num){
    document.getElementById("reto-" + num).style.display = "none";
}
