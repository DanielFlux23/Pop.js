const App = new Pop({
  container: () => `
    <form id="form-contato">
  `,
  
  cabecalho: () => `
    <h2>Entre em contato</h2>`,
  
  nome: () => `
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required />`,
  
  email: () => `
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />`,
  
  mensagem: () => `
    <label for="mensagem">Mensagem:</label>
    <textarea id="mensagem" name="mensagem" rows="4" required></textarea>`,
  
  enviar: () => `
    <button type="button" id="_enviar">Enviar</button>`,
  
  feedback: () => `
    <div id="feedback"></div>
  </form>`,
});

App.init([
  'container',
  'cabecalho',
  'nome', // você tinha esquecido de incluir 'nome' aqui
  'email',
  'mensagem',
  'enviar',
  'feedback',
]);

App.evento('#_enviar', 'click', () => {
  const email = $('email').value;
  const mensagem = $('mensagem').value;
  const nome = $('nome').value;
  
  if (email && mensagem && nome) {
    $('feedback').textContent = 'Enviado com sucesso!';
  } else {
    $('feedback').textContent = 'Preencha todos os campos.';
  }
  
  console.log({ nome, email, mensagem });
});