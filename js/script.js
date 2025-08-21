// Música
const music = document.getElementById("bg-music");

// Validar fecha para desbloquear
document.getElementById("btn-desbloquear").addEventListener("click", () => {
  const fechaIngresada = document.getElementById("fecha-amor").value;
  const mensajeError = document.getElementById("mensaje-error");

  // Fecha correcta: 23 mayo 2025
  const fechaCorrecta = "2025-05-23";

  if (fechaIngresada === fechaCorrecta) {
    document.getElementById("pantalla-inicio").classList.remove("active");
    document.getElementById("pantalla-juego").classList.add("active");
    music.play();
  } else {
    mensajeError.style.display = "block";
    mensajeError.textContent = "💔 Esa no es la fecha correcta, mi amor";
  }
});

// Botón para pasar del juego a la carta
document.getElementById("btn-mensaje").addEventListener("click", () => {
  document.getElementById("pantalla-galeria").classList.remove("active");
  document.getElementById("pantalla-final").classList.add("active");
});

// Botón de corazones finales
document.getElementById("btn-corazones").addEventListener("click", () => {
  const lluvia = document.getElementById("lluvia-final");
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-10px";
    heart.style.fontSize = "24px";
    heart.style.animation = `caer ${2 + Math.random() * 3}s linear`;
    lluvia.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
});

// Animación para la lluvia de corazones
const style = document.createElement('style');
style.innerHTML = `
@keyframes caer {
  to { transform: translateY(100vh); opacity: 0; }
}`;
document.head.appendChild(style);
