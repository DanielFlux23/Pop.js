// Mudar cor automaticamente a cada intervalo de tempo
const semaforo = { cor: 'red' };

const pop = new Pop({
semaforo:() => `<div class="semaforo">
  <div class="luz vermelho"></div>
  <div class="luz amarelo"></div>
  <div class="luz verde"></div>
</div>`
}, ['semaforo']);

/*pop.$('.vermelho').classList.add('active')
pop.$('.amarelo').classList.add('active')
pop.$('.verde').classList.add('active')
*/
const luzes = ["vermelho", "amarelo", "verde"];
let indice = 0;

function mudarLuz() {
  // Apaga todas
  luzes.forEach(classe => {
    pop.$(`.${classe}`).classList.remove("active");
  });
  
  // Acende a atual
  const luzAtual = luzes[indice];
  pop.$(`.${luzAtual}`).classList.add("active");
  
  // Passa para a próxima
  indice = (indice + 1) % luzes.length;
}

// Inicia o semáforo
setInterval(mudarLuz, 1000); // muda a cada 1 segundo

pop.css(`
.semaforo {
  width: 100px;
  height: 300px;
  background: linear-gradient(#1a1a1a, #111); /* fundo com degradê para mais profundidade */
  border: 8px solid #555; /* carcaça metálica */
  border-radius: 20px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.05); /* sombra externa e brilho interno */
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

/* Simula arranhões e sujeira */
.semaforo::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  pointer-events: none;
}

/* cada luz */
.luz {
  width: 60px;
  height: 60px;
  border: 4px solid #333;
  border-radius: 50%;
  background: radial-gradient(circle at center, #555 30%, #333 100%); /* luz apagada com profundidade */
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* mini "teto" sobre cada luz */
.luz::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 12px;
  background-color: #222;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.7);
}

/* luzes ativas brilhando */
.luz.vermelho.active {
  background: radial-gradient(circle at center, #ff3333 40%, #990000 100%);
  border-color: #660000;
  box-shadow: 0 0 30px #ff3333;
}

.luz.amarelo.active {
  background: radial-gradient(circle at center, #ffcc00 40%, #996600 100%);
  border-color: #664400;
  box-shadow: 0 0 30px #ffcc00;
}

.luz.verde.active {
  background: radial-gradient(circle at center, #33cc33 40%, #006600 100%);
  border-color: #004400;
  box-shadow: 0 0 30px #33cc33;
}
`)