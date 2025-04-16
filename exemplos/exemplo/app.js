
export const App = new Pop({
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
    <p>A biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.</p>
    <p>Use os botões de navegação para testar a troca de views sem recarregar a página.</p>
  </section>
  <footer>
    <p>Feito por <a href="https://github.com/DanielFlux23">DanielFlux23</a></p>
  </footer>

    `,
  
  contato: () => `
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
  <a href="https://github.com/DanielFlux23/Pop.js">github</a>
  `,
 snippet: () => `<button id="btn">Click me</button></br>
    <pre><code>
  App.evento('#snippet','click', () => alert('It just works.'));
  </code></pre>`,
  snippet2: () => `<div id="contador">0</div>
  <button id="incrementar">+</button>
    </br>
    <pre><code>
    let count = 0;
      App.evento('#incrementar', 'click', () => {
    count++;
  $('painel').innerHTML = count;
});
</code></pre>`,
  
});