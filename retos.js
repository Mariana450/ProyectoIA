/* ============================
      VARIABLES GLOBALES
============================= */
let retoActual = "";
let respuestaCorrecta = "";
let aciertos = 0;
let intentos = 0;
let timer = null;
let tiempo = 0;

const pantalla = document.getElementById("pantalla-reto");
const titulo = document.getElementById("titulo-reto");
const descripcion = document.getElementById("descripcion-reto");
const pregunta = document.getElementById("pregunta");
const input = document.getElementById("respuesta");
const progreso = document.getElementById("progreso");
const temporizador = document.getElementById("temporizador");
const medalla = document.getElementById("medalla");

/* ============================
      FUNCIONES GENERALES
============================= */

function mostrarPantalla(t, d) {
    pantalla.style.display = "block";
    titulo.textContent = t;
    descripcion.textContent = d;
    progreso.textContent = "";
    temporizador.textContent = "";
    medalla.textContent = "";
    input.value = "";
}

/* Genera un número aleatorio */
function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Verificador de respuesta */
function verificarRespuesta() {
    let usuario = input.value.trim();

    if (usuario === respuestaCorrecta.toString()) {
        progreso.textContent = "✔ ¡Correcto!";
        aciertos++;

        if (retoActual === "bloqueo" && aciertos >= 3) {
            medalla.textContent = "🏅 ¡Reto desbloqueado!";
        }

        if (retoActual === "precision" && intentos >= 5) {
            medalla.textContent = `⭐ Precisión: ${aciertos} correctos de 5`;
        }

        if (retoActual === "jefe" && aciertos === 1) {
            medalla.textContent = "🏆 ¡Has derrotado al jefe! Medalla obtenida.";
        }

        setTimeout(() => iniciarReto(retoActual), 1000);

    } else {
        progreso.textContent = "✖ Incorrecto";

        if (retoActual === "bloqueo") aciertos = 0;

        if (retoActual === "precision") {
            intentos++;
            if (intentos >= 5) {
                medalla.textContent = `⭐ Precisión final: ${aciertos} correctos de 5`;
            }
        }
    }
}

/* ============================
      BANCO DE EJERCICIOS
============================= */

function generarOperacionMixta() {
    let a = rand(1, 10);
    let b = rand(1, 10);
    let c = rand(1, 5);
    let expresion = `${a}(${b}+${c})`;
    respuestaCorrecta = a * (b + c);
    return expresion;
}

function generarEcuacionNivel2() {
    let x = rand(1, 10);
    let a = rand(2, 5);
    let b = rand(1, 10);
    respuestaCorrecta = x;
    return `${a}x - ${b} = ${a * x - rand(1, 5)}`;
}

function generarSimplificacion() {
    let factor = rand(2, 6);
    let x = rand(2, 10);
    let y = rand(2, 10);
    respuestaCorrecta = (factor * x + factor * y) / factor;
    return `(${factor*x} + ${factor*y}) / ${factor}`;
}

function generarModoJefe() {
    let x = rand(1, 10);
    respuestaCorrecta = x;
    return `2(x - 3) + 4x = ${6 * x - 6}`;
}

/* ============================
      RETOS ESPECÍFICOS
============================= */

function iniciarOperacionesMixtas() {
    retoActual = "mixtas";
    mostrarPantalla("🧠 Operaciones Mixtas", "Resuelve la expresión.");
    pregunta.textContent = generarOperacionMixta();
}

function iniciarEcuacionesNivel2() {
    retoActual = "nivel2";
    mostrarPantalla("🧩 Ecuaciones Nivel 2", "Encuentra el valor de x.");
    pregunta.textContent = generarEcuacionNivel2();
}

function iniciarRetoBloqueo() {
    retoActual = "bloqueo";
    aciertos = 0;
    mostrarPantalla("🔐 Reto de Bloqueo", "3 respuestas correctas seguidas.");
    pregunta.textContent = generarOperacionMixtas();
}

function iniciarContrarreloj() {
    retoActual = "tiempo";
    mostrarPantalla("⏳ Reto Contrarreloj", "Tienes 30 segundos.");
    tiempo = 30;
    iniciarTimer();
    pregunta.textContent = generarOperacionMixta();
}

function iniciarPrecision() {
    retoActual = "precision";
    aciertos = 0;
    intentos = 1;
    mostrarPantalla("🎯 Reto de Precisión", "5 intentos. ¿Qué tan preciso eres?");
    pregunta.textContent = generarOperacionMixta();
}

function iniciarSimplificacion() {
    retoActual = "simplificacion";
    mostrarPantalla("🔢 Simplificación", "Simplifica lo más que puedas.");
    pregunta.textContent = generarSimplificacion();
}

function iniciarModoJefe() {
    retoActual = "jefe";
    aciertos = 0;
    mostrarPantalla("🏆 Modo Jefe", "Un solo ejercicio. ¿Puedes vencerlo?");
    pregunta.textContent = generarModoJefe();
}

/* ============================
      TIMER
============================= */

function iniciarTimer() {
    temporizador.textContent = `⏳ Tiempo: ${tiempo}s`;

    timer = setInterval(() => {
        tiempo--;
        temporizador.textContent = `⏳ Tiempo: ${tiempo}s`;

        if (tiempo <= 0) {
            clearInterval(timer);
            temporizador.textContent = "❌ Tiempo agotado";
        }
    }, 1000);
}
