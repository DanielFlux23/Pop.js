import { App } from '/exemplos/exemplo/app.js';
const start = performance.now();
App.home = () => `
  <section id="home">
    <h2>Bem-vindo ao TitanDOM</h2>
    <p>A biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.</p>
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

App.init(['container', 'header', 'home', 'painel', ]);


const keyframes = [
  //{ left: '200px', top: '150px', width: '100px', height: '100px', opacity: 1, borderRadius: '0%', offset: 0 },
  { width: '50px', offset: 0 },
  { width: '400px', offset: 1 },
];

const timing = {
  duration: 500,
  iterations: 1,
  fill: 'forwards',
  easing: 'ease-in-out'
};

App.evento('#btn-home', 'click', () => {

  App.remover('contato')
  App.show(['home'])
  App.mover('#home', {
    duration: 1200,
      x: (p) => Math.sin(p * Math.PI) * 10, // um leve bounce lateral
    y: (p) => -Math.sin(p * Math.PI) * 50 // uma subida e descida suave
  });
  App.$$('home').animate(keyframes, timing).onfinish = () => {
    console.log("Tudo feito, chefia!");
  };
});

App.evento('#btn-contato', 'click', () => {
  /*App.remover('snippet');
  App.remover('snippet2')*/
  App.remover('home')
  App.show(['contato']);
  App.mover('#contato', {
    duration: 1000,
    //x: (p) => Math.sin(p * Math.PI * 2) * 100,
    y: (p) => Math.cos(p * Math.PI * 2) * 20
  });
  App.$$('contato').animate(keyframes, timing).onfinish = () => {
    console.log("Tudo feito, chefia!");
  };
  
  App.evento('#enviar', 'click', () => {
    const nome = App.$('#nome').value;
    const email = App.$('#email').value;
    const msg = App.$('#mensagem').value;
    
    if (nome && email && msg) {
      fetch('http://localhost:3000/api/contato', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, mensagem: msg })
        })
        .then(res => res.json())
        .then(data => {
          $('feedback').textContent = data.sucesso || 'Mensagem enviada!';
        })
        .catch(err => {
          console.error(err);
          App.$('#feedback').textContent = 'Erro ao enviar mensagem.';
        });
    } else {
      App.$('#feedback').textContent = 'Preencha todos os campos.';
    }
  });
});



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
  background:#F00202;
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
  width:90%;
  padding: 10px 10px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95 rem;
  line-height: 1.5;
  margin-bottom: 1.5 rem;
  margin:0 auto;
  box-shadow: 0 4 px 12 px rgba(0, 0, 0, 0.2);
}

code {
  display: block;
  white-space: pre;
}

/* Adicionais para destacar sintaxe simples (sem lib externa) */
code.tag { color: #569cd6; }
code.attr { color: # 9 cdcfe; }
code.string { color: #ce9178; }
code.function { color: #dcdcaa; }
code.keyword { color: #c586c0; }
`);
const end = performance.now();
console.log(`Demorou ${(end - start).toFixed(2)} ms`);