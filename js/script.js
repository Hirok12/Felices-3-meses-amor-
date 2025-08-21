// script.js

document.addEventListener("DOMContentLoaded", () => {
  let pantallaActual = 0;
  const pantallas = document.querySelectorAll(".pantalla");
  const btnComenzar = document.getElementById("btn-comenzar");
  const btnVerCarta = document.getElementById("btn-ver-carta");
  const btnVerFinal = document.getElementById("btn-ver-final");
  const btnFinal = document.getElementById("btn-final");

  // --- Función para mostrar una pantalla ---
  function mostrarPantalla(i) {
    pantallas.forEach((p, index) => {
      p.classList.toggle("active", index === i);
    });
    pantallaActual = i;
  }

  // --- Pantalla inicial ---
  if (btnComenzar) {
    btnComenzar.addEventListener("click", () => {
      mostrarPantalla(1); // Ir al juego
      iniciarJuego();
    });
  }

  // --- Botón para ir a la carta ---
  if (btnVerCarta) {
    btnVerCarta.addEventListener("click", () => {
      mostrarPantalla(2);
    });
  }

  // --- Botón para ir a la pantalla final ---
  if (btnVerFinal) {
    btnVerFinal.addEventListener("click", () => {
      mostrarPantalla(3);
    });
  }

  // --- Botón final que lanza la lluvia de corazones ---
  if (btnFinal) {
    btnFinal.addEventListener("click", () => {
      lluviaCorazones();
    });
  }

  // ====================
  // 🎮 Juego de corazones
  // ====================
  let puntos = 0;
  let tiempo = 20;
  let intervalo;

  const areaJuego = document.getElementById("area-juego");
  const puntosSpan = document.getElementById("puntos");
  const tiempoSpan = document.getElementById("tiempo");

  function iniciarJuego() {
    puntos = 0;
    tiempo = 20;
    puntosSpan.textContent = puntos;
    tiempoSpan.textContent = tiempo;
    areaJuego.innerHTML = "";

    clearInterval(intervalo);
    intervalo = setInterval(() => {
      tiempo--;
      tiempoSpan.textContent = tiempo;
      if (tiempo <= 0) {
        clearInterval(intervalo);
        mostrarPantalla(2); // Cuando acaba, mostrar carta
      } else {
        crearCorazon();
      }
    }, 1000);
  }

  function crearCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon");
    corazon.textContent = "💖";
    corazon.style.left = Math.random() * 90 + "%";
    corazon.addEventListener("click", () => {
      puntos++;
      puntosSpan.textContent = puntos;
      corazon.remove();
    });
    areaJuego.appendChild(corazon);

    setTimeout(() => corazon.remove(), 4000);
  }

  // ====================
  // 💕 Lluvia final
  // ====================
  function lluviaCorazones() {
    const lluvia = document.createElement("div");
    lluvia.classList.add("lluvia");
    document.body.appendChild(lluvia);

    for (let i = 0; i < 40; i++) {
      const corazon = document.createElement("div");
      corazon.classList.add("corazon-final");
      corazon.textContent = "💘";
      corazon.style.left = Math.random() * 100 + "vw";
      corazon.style.animationDuration = (3 + Math.random() * 3) + "s";
      corazon.style.fontSize = (1 + Math.random() * 2) + "rem";
      lluvia.appendChild(corazon);

      setTimeout(() => corazon.remove(), 6000);
    }

    setTimeout(() => lluvia.remove(), 7000);
  }
});
