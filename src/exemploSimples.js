const App = new Pop({
  container: () => `<main id="app"></main>`,
  
  header: () => `
    <header>
      <h1>Pop.js App</h1>
      <nav>
        <button id="btn-home">Home</button>
        <button id="btn-contato">Contato</button>
      </nav>
    </header>`,
  
  home: () => `
    <section id="home">
      <h2>Bem-vindo</h2>
      <p>Este é um exemplo adaptável com Pop.js.</p>
    </section>`,
  
  contato: () => `
    <section id="contato">
      <h2>Fale conosco</h2>
      <input type="text" id="nome" placeholder="Nome" />
      <input type="email" id="email" placeholder="Email" />
      <textarea id="mensagem" placeholder="Mensagem"></textarea>
      <button id="enviar">Enviar</button>
      <div id="feedback"></div>
    </section>`,
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

App.init(['container', 'header', 'home']);

App.evento('#btn-home', 'click', () => {
  $('app').innerHTML = App.home();
});

App.evento('#btn-contato', 'click', () => {
  $('app').innerHTML = App.contato();
  
  App.evento('#enviar', 'click', () => {
    const nome = $('nome').value;
    const email = $('email').value;
    const msg = $('mensagem').value;
    
    if (nome && email && msg) {
      $('feedback').textContent = 'Mensagem enviada com sucesso!';
    } else {
      $('feedback').textContent = 'Preencha todos os campos.';
    }
  });
});