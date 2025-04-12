import { App } from '/exemplos/exemplo/app.js';

// Funções de animação
const keyframes = [
  { width: '50px', offset: 0 },
  { width: '400px', offset: 1 },
];

const timing = {
  duration: 500,
  iterations: 1,
  fill: 'forwards',
  easing: 'ease-in-out',
};

function animateSection(sectionId) {
  App.$$(sectionId).animate(keyframes, timing).onfinish = () => {
    console.log(`${sectionId} animação finalizada!`);
  };
}

// Definição das views
App.home = () => `
  <section id="home">
    <h2>Bem-vindo ao Pop.js</h2>
    <p>A biblioteca leve e flexível para manipulação dinâmica do DOM...</p>
    <p>Use os botões de navegação para testar a troca de views sem recarregar a página.</p>
  </section>
`;

App.contato = () => `
  <section id="contato">
    <h2>Fale conosco</h2>
    <label for="nome">Nome:</label>
    <input type="text" id="nome" placeholder="Seu nome" />
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Seu email" />
    <label for="mensagem">Mensagem:</label>
    <textarea id="mensagem" placeholder="Escreva sua mensagem"></textarea>
    <button id="enviar">Enviar</button>
    <div id="feedback"></div>
  </section>
`;

App.init(['container', 'header', 'home', 'painel']);

// Função para alternar entre as views
function switchView(from, to) {
  App.remover(from);
  App.show([to]);
  animateSection(to);
}

// Navegação
App.evento('#btn-home', 'click', () => switchView('contato', 'home'));
App.evento('#btn-contato', 'click', () => switchView('home', 'contato'));

// Envio de mensagem
App.evento('#enviar', 'click', () => {
  const nome = $('nome').value;
  const email = $('email').value;
  const msg = $('mensagem').value;
  
  if (nome && email && msg) {
    $('feedback').textContent = 'Enviando...';
    
    fetch('http://localhost:3000/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, mensagem: msg })
      })
      .then(res => res.json())
      .then(data => {
        $('feedback').textContent = data.sucesso || 'Mensagem enviada com sucesso!';
      })
      .catch(err => {
        console.error(err);
        $('feedback').textContent = 'Erro ao enviar mensagem.';
      });
  } else {
    $('feedback').textContent = 'Preencha todos os campos.';
  }
});

// Partículas no header
function criarParticulas(x, y, quantidade = 20) {
  for (let i = 0; i < quantidade; i++) {
    const part = document.createElement('div');
    part.className = 'particle';
    document.body.appendChild(part);
    
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 100 + 30;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    
    part.style.left = `${x}px`;
    part.style.top = `${y}px`;
    
    part.animate([
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
    ], {
      duration: 1000 + Math.random() * 500,
      easing: 'ease-out',
      fill: 'forwards',
    });
    
    setTimeout(() => part.remove(), 1500);
  }
}

// Animação do header com partículas
setTimeout(() => {
  const header = App.$$('header');
  if (!header) return;
  
  const keyframes = [
    { transform: 'translate(0, 0) scale(0.3)', opacity: 0.5, offset: 0 },
    { transform: 'translate(80px, -30px) scale(0.7)', opacity: 1, offset: 0.2 },
    { transform: 'translate(200px, 80px) scale(0.5)', opacity: 0.6, offset: 0.5 },
    { transform: 'translate(120px, 250px) scale(0.2)', offset: 0.75 },
    { transform: 'translate(0px, 0px) scale(1)', opacity: 1, offset: 1 },
  ];
  
  const anim = header.animate(keyframes, {
    duration: 4000,
    iterations: 1,
    fill: 'forwards',
    easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  });
  
  anim.onfinish = () => {
    criarParticulas(window.innerWidth / 2, 100);
    console.log("Explosão visual concluída com sucesso.");
  };
}, 10);

// CSS otimizado
App.css(`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
}

main#app {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

header {
  background-color: #20232a;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  margin-bottom: 10px;
  font-size: 2em;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
}

nav button {
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: #20232a;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav button:hover {
  background-color: #21a1f1;
}

section {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

section h2 {
  margin-bottom: 15px;
  color: #20232a;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button#enviar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button#enviar:hover {
  background-color: #218838;
}

#feedback {
  margin-top: 15px;
  font-weight: bold;
  color: #ff5722;
}

/* Link estilizado */
a[href*="github"] {
  display: inline-block;
  margin-top: 20px;
  color: #0366d6;
  text-decoration: none;
  font-weight: bold;
}

a[href*="github"]:hover {
  text-decoration: underline;
}

pre {
  background-color: #1e1e1e;
  color: #dcdcdc;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
}

code {
  display: block;
  white-space: pre;
}

code.tag { color: #569cd6; }
code.attr { color: #9cdcfe; }
code.string { color: #ce9178; }
code.function { color: #dcdcaa; }
code.keyword { color: #c586c0; }

#scene {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: yellow;
  border-radius: 50%;
  opacity: 0.8;
  pointer-events: none;
  z-index: 5;
  box-shadow: 0 0 10px orange;
}
`);