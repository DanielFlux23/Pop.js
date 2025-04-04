let nome = 'paulo';

// Inicializa um objeto Pop com diferentes blocos
const pop = new Pop({
  blocoSimples: () => `<h1>Hello</h1>`, // Bloco básico com um título
  bloco2: () => `Este bloco será removido`, // Bloco temporário
  blocoVariavel: () => `<p>Bom dia, ${nome}!</p>`, // Bloco dinâmico baseado em variável
  $blocoClone: () => 'blocoSimples', // Clone do blocoSimples
  $blocoCloneComFuncao: () => ['blocoSimples', () => `<h1>Word</h1>`], // Clone com conteúdo modificado
});

// Inicializa os blocos e adiciona ao DOM
pop.init([
  'blocoSimples',
  'bloco2',
  'blocoVariavel',
  '$blocoClone',
  '$blocoCloneComFuncao'
]);

// Atualiza a variável e reflete a mudança no DOM
nome = 'ana';
pop.show(['blocoVariavel']); // Agora exibirá "Bom dia, Ana!"

// Obtém e exibe no console o elemento do blocoVariavel
console.log(pop.id('blocoVariavel'));

// Anima o clone do blocoSimples (rotação)
pop.animar('$blocoClone', {
  type: "rotate",
  duration: 500,
  easing: "ease-in-out",
  repeat: true,
  delay: 0,
  direction: 40,
});

// Movimenta o blocoVariavel no eixo X e Y
pop.mover('blocoVariavel', {
  paraBaixo: { y: 0, ay: 2, delay: 50 }, // Desce gradualmente
  paraADireita: { x: 0, ax: 2, delay: 30, maxX: 50 }, // Move à direita até 50px
});

// Adiciona um evento de clique ao blocoSimples
pop.evento('#blocoSimples', 'click', () => {
  console.log('Hello, Word!');
});

// Remove o bloco2 do DOM
pop.remover('bloco2');

// Clona e adiciona blocoSimples ao DOM
pop.init('&blocoSimples');

// Adiciona um novo bloco dinamicamente e o inicializa
pop.add('novoBloco', () => `<p>Novo bloco pronto!</p>`).init(['novoBloco']);

// Clona blocoSimples com um novo ID
pop.clone('blocoSimples', 'myblocoSimples');

// Modifica o estilo do novo bloco (fundo amarelo)
pop.style('novoBloco').background = 'yellow';

/*observando uma variáve*/
pop.setVar('teste',() => console.log('hello word'))

/*const state = pop.setVar({ text: "hello Word!" });

Pop.new({
  id: "exemplo",
  html: `<div><p>{{msg}}</p><button>Clique</button></div>`,
  fn: (el) => {
    el.querySelector("button").onclick = () => {
      state.msg = "Você clicou!";
    };
  },
  bind: { msg: () => state.msg }
}).show("#app");
*/