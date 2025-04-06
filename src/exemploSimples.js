const App = new Pop({
  container: () => `<main id="app"></main>`,
  
  header: () => `
    <header>
      <h1>Pop.js</h1>
      <nav>
        <button id="btn-home">Home</button>
        <button id="btn-contato">Contato</button>
      </nav>
    </header>`,
  
  home: () => `
    <section id="home">
      <h2>Bem-vindo</h2>
      <p>Este é um exemplo adaptável com Pop.js.</p>
    </section>
    <a href="https://github.com/DanielFlux23/Pop.js">github</githuba>

    `,
  
  contato: () => `
    <section id="contato">
      <h2>Fale conosco</h2>
      <input type="text" id="nome" placeholder="Nome" />
      <input type="email" id="email" placeholder="Email" />
      <textarea id="mensagem" placeholder="Mensagem"></textarea>
      <button id="enviar">Enviar</button>
      <div id="feedback"></div>
    </section>`,
    painel:() => ``
});

App.home = () => `
  <section id="home">
    <h2>Bem-vindo ao Pop.js</h2>
    <p>Este é um template base que você pode adaptar para qualquer projeto.</p>
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

App.init(['container', 'header', 'home','painel']);

App.evento('#btn-home', 'click', () => {
  $('_painel').innerHTML = App.home();
});

App.evento('#btn-contato', 'click', () => { $('_painel').innerHTML = App.contato()


App.evento('#enviar', 'click', () => {
  const nome = $('nome').value;
  const email = $('email').value;
  const msg = $('mensagem').value;
  
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
        $('feedback').textContent = 'Erro ao enviar mensagem.';
      });
  } else {
    $('feedback').textContent = 'Preencha todos os campos.';
  }
}); });

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
`)