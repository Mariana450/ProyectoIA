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

document.getElementById('start-btn').addEventListener('click', () => {
    playClickSound();
    vibrate();
    animateButton("start-btn");
    console.log("Práctica iniciada.");
});

document.getElementById('generator-btn').addEventListener('click', () => {
    playClickSound();
    vibrate();
    animateButton("generator-btn");
    console.log("Generando un nuevo problema...");
});

/* ---------------- ACCESIBILIDAD (SOLO MODO ACCESIBLE SIMPLE) ---------------- */

const ACCESS_KEY = "algebra_accessible";

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
            toggleAccessible();
        });
    }
}

document.addEventListener("DOMContentLoaded", initAccessibleMode);

/* ---------------- ANIMACIONES ---------------- */

function animateButton(id) {
    const btn = document.getElementById(id);
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 180);
}

/* ---------------- VIBRACIÓN ---------------- */

function vibrate(time = 30) {
    if (navigator.vibrate) {
        navigator.vibrate(time);
    }
}

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
const selector = document.getElementById("modo-selector");

selector.addEventListener("change", (e) => {
    document.body.classList.remove("accessible");
    document.body.classList.remove("autista");

    const modo = e.target.value;

    if(modo === "accessible"){
        document.body.classList.add("accessible");
        localStorage.setItem("modo", "accessible");
    }
    else if(modo === "autista"){
        document.body.classList.add("autista");
        localStorage.setItem("modo", "autista");
    }
    else {
        localStorage.setItem("modo", "normal");
    }
});



