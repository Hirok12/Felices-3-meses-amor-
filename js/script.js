
document.addEventListener("DOMContentLoaded", () => {
  const pantallas = document.querySelectorAll(".pantalla");
  const btnComenzar = document.getElementById("btn-comenzar");
  const btnMensaje = document.getElementById("btn-mensaje");
  const btnCorazones = document.getElementById("btn-corazones");
  const contadorSpan = document.getElementById("contador");
  const areaJuego = document.getElementById("area-juego");
  const musica = document.getElementById("bg-music");
  const lluviaFinal = document.getElementById("lluvia-final");

  let contador = 0;

  function mostrarPantalla(id) {
    pantallas.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  btnComenzar.addEventListener("click", () => {
    mostrarPantalla("pantalla-juego");
    musica.play();
    iniciarJuego();
  });

  btnMensaje.addEventListener("click", () => {
    mostrarPantalla("pantalla-final");
  });

  btnCorazones.addEventListener("click", () => {
    lanzarCorazones();
  });

  function iniciarJuego() {
    let intervalo = setInterval(() => {
      crearCorazon();
    }, 1200);

    function crearCorazon() {
      const corazon = document.createElement("div");
      corazon.classList.add("corazon");
      corazon.textContent = "💗";
      corazon.style.left = Math.random() * (areaJuego.offsetWidth - 30) + "px";
      areaJuego.appendChild(corazon);

      corazon.addEventListener("click", () => {
        corazon.remove();
        contador++;
        contadorSpan.textContent = contador;
        if (contador >= 3) {
          clearInterval(intervalo);
          setTimeout(() => {
            mostrarPantalla("pantalla-galeria");
          }, 1000);
        }
      });

      setTimeout(() => corazon.remove(), 6000);
    }
  }

  function lanzarCorazones() {
    for (let i = 0; i < 15; i++) {
      const corazon = document.createElement("div");
      corazon.classList.add("corazon");
      corazon.textContent = "💖";
      corazon.style.left = Math.random() * window.innerWidth + "px";
      corazon.style.top = "-30px";
      lluviaFinal.appendChild(corazon);

      setTimeout(() => corazon.remove(), 5000);
    }
  }
});
