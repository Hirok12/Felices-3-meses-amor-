
document.addEventListener("DOMContentLoaded", () => {
  const pantallas = document.querySelectorAll(".pantalla");
  const btnComenzar = document.querySelector(".btn-comenzar");
  const btnMensaje = document.querySelector(".btn-mensaje");
  const btnCorazones = document.querySelector(".btn-corazones");
  const contadorSpan = document.querySelector(".contador-numero");
  const areaJuego = document.querySelector(".area-juego");
  const musica = document.getElementById("bg-music");
  const lluviaFinal = document.querySelector(".lluvia");

  let contador = 0;

  function mostrarPantalla(clase) {
    pantallas.forEach(p => p.classList.remove("active"));
    document.querySelector(`.${clase}`).classList.add("active");
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
  setInterval(() => {
    let cantidad = Math.floor(Math.random() * 2) + 2; 
    
    for (let i = 0; i < cantidad; i++) {
    crearCorazon();
  }
}, 500);

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
        if (contador >= 12) {
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
