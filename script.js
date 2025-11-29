/* ---------------- SOLVER ---------------- */

function solveSample(key){
  if(key === '2x+5=17'){
    alert('Solución: 2x + 5 = 17 → 2x = 12 → x = 6');
  } else if(key === 'x^2-5x+6'){
    alert('Factorización: (x-2)(x-3)');
  } else {
    alert('Sistema: x = 2, y = 3');
  }
}

/* ---------------- BOTONES PRINCIPALES ---------------- */

document.getElementById('start-btn').addEventListener('click', iniciarPractica);
document.getElementById('generator-btn').addEventListener('click', generarProblema);

function iniciarPractica() {
    playClickSound();
    vibrate();
    animateButton("start-btn");
    console.log("Práctica iniciada.");
}

function generarProblema() {
    playClickSound();
    vibrate();
    animateButton("generator-btn");
    console.log("Generando un nuevo problema...");
}

/* ---------------- ACCESIBILIDAD ---------------- */

const accessBtn = document.getElementById("access-btn");
let accessibleMode = false;

accessBtn.addEventListener("click", () => {
    const body = document.body;
    accessibleMode = !accessibleMode;

    playToggleSound();
    vibrate(60); // vibración larga

    if (accessibleMode) {
        body.classList.add("accessible");
        accessBtn.textContent = "Modo normal";
    } else {
        body.classList.remove("accessible");
        accessBtn.textContent = "Modo accesible";
    }

    animateButton("access-btn");
});

/* ---------------- ANIMACIONES ---------------- */

function animateButton(id) {
    const btn = document.getElementById(id);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 200);
}

/* ---------------- VIBRACIÓN (si existe) ---------------- */

function vibrate(time = 30) {
    if (navigator.vibrate) {
        navigator.vibrate(time);
    }
}

/* ---------------- SONIDOS ---------------- */

const clickSound = new Audio("click.wav");     // sonido suave de clic
const toggleSound = new Audio("toggle.wav");   // sonido para modo accesible

function playClickSound(){
    clickSound.currentTime = 0;
    clickSound.play();
}

function playToggleSound(){
    toggleSound.currentTime = 0;
    toggleSound.play();
}
/* ---------------- MODO SUPER ACCESIBLE ---------------- */

let superAccessible = false;

document.getElementById("super-access-btn").addEventListener("click", () => {
    superAccessible = !superAccessible;
    toggleSuperAccessible();
});

/* Activar o desactivar modo */
function toggleSuperAccessible() {
    const body = document.body;

    if (superAccessible) {
        body.classList.add("super-accessible");
        speak("Modo accesible para baja visión activado.");
        vibrate(120);
    } else {
        body.classList.remove("super-accessible");
        speak("Modo accesible desactivado.");
        vibrate(80);
    }
}

/* --- Voz (Text to Speech) --- */
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "es-MX";
    msg.rate = 0.9;
    msg.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}

/* --- Vibración --- */
function vibrate(time = 40) {
    if (navigator.vibrate) {
        navigator.vibrate(time);
    }
}

/* --- Que el sistema “hable” al pasar sobre botones --- */
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("focus", () => {
        if (superAccessible) speak(btn.innerText);
    });

    btn.addEventListener("mouseover", () => {
        if (superAccessible) speak(btn.innerText);
    });
});

/* --- Navegación con teclado --- */
let focusIndex = 0;

document.addEventListener("keydown", e => {
    if (!superAccessible) return;

    const btns = Array.from(document.querySelectorAll("button"));

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        focusIndex = (focusIndex + 1) % btns.length;
        btns[focusIndex].focus();
        vibrate(30);
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        focusIndex = (focusIndex - 1 + btns.length) % btns.length;
        btns[focusIndex].focus();
        vibrate(30);
    }

    if (e.key === "Enter") {
        speak("Activado");
        vibrate(80);
        document.activeElement.click();
    }
});

