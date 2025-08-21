// ===== Utilidades de pantallas =====
const pantallas = {
  inicio: document.getElementById('pantalla-inicio'),
  juego: document.getElementById('pantalla-juego'),
  galeria: document.getElementById('pantalla-galeria'),
  final: document.getElementById('pantalla-final'),
};
function mostrar(id){
  Object.values(pantallas).forEach(p => p.classList.remove('active'));
  pantallas[id].classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

// ===== Música =====
const musica = document.getElementById('bg-music');
function iniciarMusica(){
  musica.play().catch(()=>{/* algunos navegadores requieren interacción extra */});
}

// ===== Lógica del juego =====
const areaJuego = document.getElementById('area-juego');
const contadorUI = document.getElementById('contador');
let capturados = 0;
let spawnerId = null;

function crearCorazon(){
  const span = document.createElement('span');
  span.className = 'heart';
  // Colores románticos mezclados
  const colores = ['#ff4d6d', '#ff80a6', '#ffd6e8', '#ffb3c6', '#ff8fab'];
  span.textContent = '❤';
  span.style.color = colores[Math.floor(Math.random()*colores.length)];
  span.style.left = Math.random() * (areaJuego.clientWidth - 40) + 'px';

  // Duración de caída aleatoria
  const dur = 5 + Math.random()*4; // 5s a 9s
  span.style.animationDuration = `${dur}s`;

  // Click / tap para capturar
  span.addEventListener('click', () => {
    capturar(span);
  }, {passive:true});

  areaJuego.appendChild(span);

  // Limpieza por si no se clicó
  setTimeout(()=> span.remove(), (dur+0.5)*1000);
}

function iniciarJuego(){
  capturados = 0;
  contadorUI.textContent = '0';
  // spawn cada 900ms
  spawnerId = setInterval(crearCorazon, 900);
}

function terminarJuego(){
  clearInterval(spawnerId);
  spawnerId = null;
  // limpiar corazones restantes
  document.querySelectorAll('.heart').forEach(h => h.remove());
  setTimeout(()=> mostrar('galeria'), 500);
}

function capturar(el){
  // pequeña animación al capturar
  el.style.transition = 'transform .25s ease, opacity .25s ease';
  el.style.transform = 'scale(0.1) rotate(-30deg)';
  el.style.opacity = '0';
  setTimeout(()=> el.remove(), 220);

  capturados++;
  contadorUI.textContent = capturados.toString();
  if(capturados >= 3){
    terminarJuego();
  }
}

// ===== Lluvia de corazones final =====
const lluviaFinal = document.getElementById('lluvia-final');
function soltarCorazonesFinal(cantidad = 40){
  for(let i=0;i<cantidad;i++){
    const s = document.createElement('span');
    s.textContent = '💖';
    s.style.left = Math.random()*100 + 'vw';
    s.style.top = (-10 - Math.random()*30) + 'vh';
    s.style.animationDuration = (5 + Math.random()*5) + 's';
    lluviaFinal.appendChild(s);
    setTimeout(()=> s.remove(), 11000);
  }
}

// ===== Eventos de navegación =====
document.getElementById('btn-comenzar').addEventListener('click', () => {
  iniciarMusica();
  mostrar('juego');
  iniciarJuego();
});

document.getElementById('btn-mensaje').addEventListener('click', () => {
  mostrar('final');
  soltarCorazonesFinal(35);
});

document.getElementById('btn-corazones').addEventListener('click', () => {
  soltarCorazonesFinal(25);
});

// Accesibilidad: también capturar por touch en toda el área si cae justo bajo el dedo
areaJuego.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if(el && el.classList.contains('heart')){
    capturar(el);
  }
}, {passive:true});
