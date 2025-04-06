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
