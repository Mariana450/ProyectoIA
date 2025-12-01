/* ---------------- CONFIG GENERAL ---------------- */

const ACCESS_KEY = "algebra_accessible";

/* ---------------- SONIDOS ---------------- */

const clickSound = new Audio("click.wav");
const toggleSound = new Audio("toggle.wav");

function playClickSound(){
    clickSound.currentTime = 0;
    clickSound.play();
}

function playToggleSound(){
    toggleSound.currentTime = 0;
    toggleSound.play();
}

/* ---------------- VIBRACIÓN ---------------- */

function vibrate(time = 30) {
    if (navigator.vibrate) {
        navigator.vibrate(time);
    }
}

/* ---------------- ANIMACIÓN ---------------- */

function animateButton(id) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 180);
}

/* ---------------- ACCESIBILIDAD GLOBAL ---------------- */

function applyAccessibleState(enabled) {
    if (enabled) {
        document.body.classList.add("accessible");
    } else {
        document.body.classList.remove("accessible");
    }

    const btn = document.getElementById("access-btn");
    if (btn) {
        btn.textContent = enabled ? "Modo normal" : "Modo accesible";
    }
}

function toggleAccessible() {
    const current = localStorage.getItem(ACCESS_KEY) === "true";
    const next = !current;

    localStorage.setItem(ACCESS_KEY, next ? "true" : "false");
    applyAccessibleState(next);

    playToggleSound();
    vibrate(70);
}

function initAccessibleMode() {
    const saved = localStorage.getItem(ACCESS_KEY) === "true";
    applyAccessibleState(saved);

    const btn = document.getElementById("access-btn");
    if (btn) {
        btn.addEventListener("click", () => {
            animateButton("access-btn");
            playClickSound();
            toggleAccessible();
        });
    }
}

document.addEventListener("DOMContentLoaded", initAccessibleMode);
