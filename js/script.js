const music = document.getElementById("bg-music");
const pantallas = document.querySelectorAll(".pantalla");
const btnComenzar = document.getElementById("btn-comenzar");
const btnMensaje = document.getElementById("btn-mensaje");
const btnCorazones = document.getElementById("btn-corazones");
const areaJuego = document.getElementById("area-juego");
const contadorEl = document.getElementById("contador");
const lluviaFinal = document.getElementById("lluvia-final");
let contador=0;

function mostrarPantalla(id){
  pantallas.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

btnComenzar.addEventListener("click",()=>{
  music.play();
  mostrarPantalla("pantalla-juego");
  iniciarJuego();
});

function iniciarJuego(){
  contador=0;
  contadorEl.textContent=contador;
  let intervalo=setInterval(()=>{
    crearCorazon(intervalo);
  },1000);
}

function crearCorazon(intervalo){
  const corazon=document.createElement("div");
  corazon.classList.add("corazon");
  corazon.textContent="💖";
  corazon.style.left=Math.random()*90+"%";
  areaJuego.appendChild(corazon);

  corazon.addEventListener("click",()=>{
    corazon.remove();
    contador++;
    contadorEl.textContent=contador;
    if(contador>=3){
      clearInterval(intervalo);
      setTimeout(()=>mostrarPantalla("pantalla-galeria"),800);
    }
  });

  setTimeout(()=>corazon.remove(),4000);
}

btnMensaje.addEventListener("click",()=>{
  mostrarPantalla("pantalla-final");
});

btnCorazones.addEventListener("click",()=>{
  for(let i=0;i<15;i++){
    const c=document.createElement("div");
    c.classList.add("corazon-final");
    c.textContent="💗";
    c.style.left=Math.random()*100+"vw";
    c.style.fontSize=(Math.random()*20+20)+"px";
    c.style.animationDuration=(Math.random()*3+3)+"s";
    lluviaFinal.appendChild(c);
    setTimeout(()=>c.remove(),6000);
  }
});
