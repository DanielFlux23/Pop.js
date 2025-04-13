let nome = 'paulo';

// Inicializa um objeto Pop com diferentes blocos
const pop = new Pop({
  box:() => `text`,
  blocoSimples: () => `<h1>Hello</h1>`, // Bloco básico com um título
  bloco2: () => `Este bloco será removido`, // Bloco temporário
  blocoVariavel: () => `<p>Bom dia, ${nome}!</p>`, // Bloco dinâmico baseado em variável
  $blocoClone: () => 'blocoSimples', // Clone do blocoSimples
  $blocoCloneComFuncao: () => ['blocoSimples', () => `<h1>Word</h1>`], // Clone com conteúdo modificado
});

// Inicializa os blocos e adiciona ao DOM
pop.init([
  'box',
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

  
  
  const configAnimacoes = {animacoes:[],config:{}};

  pop.anime('#box', {
    props: [
    {
      transform: 'translateX(0)',
      opacity: 0.5,
      offset: 0
    },
    {
      transform: 'translateX(50px)',
      opacity: 0.9,
      offset: 0.5
    }],
    duration: 2000,
    easing: 'ease-in-out'
  }).onfinish = () => {
    console.log("Tudo feito, chefia!");
  };
  
  /*anime('#box')
    .add({
      transform: 'translateX(0)',
      opacity: 0.5,
      offset: 0
    })
    .add({
      transform: 'translateX(10px)',
      opacity: 0.9,
      offset: 0
    })
    .config({
      duration: 2000,
      easing: 'ease-in-out'
    }).onfinish = () => {
      console.log("Tudo feito, chefia!");
    };
  */

pop.anime('$blocoClone', {
  rotate:'10px'
}, () => console.log(0));


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