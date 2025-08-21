// Botón para pausar/reproducir música
const musica = document.getElementById("musica");
const btn = document.getElementById("toggleMusica");

btn.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    btn.textContent = "⏸️ Pausar Música";
  } else {
    musica.pause();
    btn.textContent = "▶️ Reproducir Música";
  }
});

// Animación de corazones
const corazonesContainer = document.querySelector(".corazones");

function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "💖";
  corazon.style.left = Math.random() * 100 + "vw";
  corazon.style.fontSize = Math.random() * 20 + 15 + "px";
  corazon.style.animationDuration = Math.random() * 3 + 3 + "s";

  corazonesContainer.appendChild(corazon);

  setTimeout(() => {
    corazon.remove();
  }, 6000);
}

setInterval(crearCorazon, 500);
