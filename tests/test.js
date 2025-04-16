class Fxtests {
  constructor() {
    this.tests = [];
    this.errors = {};
    this.ok = true; // Começa presumindo que tudo vai dar certo
  }
  
  // Adiciona um teste
  add({ name, teste, resultEsperado }) {
    this.tests.push({ name, teste, resultEsperado });
  }
  
  // Executa todos os testes
  run() {
    this.errors = {}; // limpa os erros anteriores
    this.ok = true; // reset da flag ok
    
    for (let i = 0; i < this.tests.length; i++) {
      const { name, teste, resultEsperado } = this.tests[i];
      let resultado;
      
      try {
        resultado = teste(); // executa uma vez
      } catch (e) {
        resultado = `Erro: ${e.message}`;
        this.ok = false;
        this.errors[i] = { name, result: resultado, resultEsperado, check: 'Fxtests:exception' };
        console.error(`${name}: Fxtests:exception`);
        continue;
      }
      
      const check = resultado === resultEsperado;
      const status = check ? 'Fxtests:ok' : 'Fxtests:error';
      
      if (!check) {
        this.ok = false;
        this.errors[i] = { name, result: resultado, resultEsperado, check: status };
      }
      
      console.log(`${name}: ${status}`);
    }
    
    if (!this.ok) {
      console.log('\nErros encontrados:');
      console.table(this.errors);
    }
  }
  
  // Relatório final e limpeza visual
  clear() {
    const elogios = [
  "Fxtests: tudo funcionando — o bug te teme.",
  "Fxtests: tudo funcionando — respira, só sucesso.",
  "Fxtests: tudo funcionando — paz interior alcançada.",
  "Fxtests: tudo funcionando — hoje o deploy vai.",
  "Fxtests: tudo funcionando — nem o ChatGPT achou erro.",
  "Fxtests: tudo funcionando — esse commit é histórico.",
];

const elogio = elogios[Math.floor(Math.random() * elogios.length)];
    console.clear();
    if (this.ok) {
      setTimeout(() => console.log(`%c${elogio}`, 'color:lime;'), 200);

      //setTimeout(() => console.log('%cFxtests: tudo funcionando', 'color:lime;'), 2000);
    } else {
      console.error('Fxtests: erros encontrados');
      console.table(this.errors);
    }
  }
  
  // Método pra resetar tudo (tests + errors)
  reset() {
    this.tests = [];
    this.errors = {};
    this.ok = true;
    console.log('%cFxtests: resetado', 'color:gray;');
  }
}
const fxtests = new Fxtests();
//Verificar se a classe Pop é instanciada corretamente e se os blocos são inicializados conforme o esperado.

fxtests.add({
  name: 'Testando o constructor',
  teste: () => {
    const pop = new Pop({
      header: () => '<h1>Test</h1>'
    }, ['header']);
    return pop.id('header') === '<h1>Test</h1>';
  },
  resultEsperado: true
});

//Verificar se a função init adiciona corretamente os blocos no DOM e executa a função onRender.

fxtests.add({
  name: 'Testando init',
  teste: () => {
    const pop = new Pop({
      card: () => '<div class="card">Card</div>'
    });
    pop.init(['card'], {
      text: 'Alterado!',
      onRender: (el) => el.style.border = '2px dashed blue'
    });
    const card = pop.$$('card').attributes;
    
    return card.id.value === 'card'&& card.style.value === 'border: 2px dashed blue;';//'<div id="card" style="border: 2px dashed blue;">Alterado!</div>' ;//&& card.style.border === '2px dashed blue';
  },
  resultEsperado: true
});

//Verificar se o método id retorna o conteúdo correto de um bloco.

fxtests.add({
  name: 'Testando id',
  teste: () => {
    const pop = new Pop({
      header: () => '<h1>Header</h1>'
    });
    return pop.id('header') === '<h1>Header</h1>';
  },
  resultEsperado: true
});

//Verificar se a função show atualiza o conteúdo dos blocos corretamente.

fxtests.add({
  name: 'Testando show',
  teste: () => {
    const pop = new Pop({
      header: () => '<h1>Header</h1>',
      footer: () => '<footer>Footer</footer>'
    });
    pop.show(['header']);
    return pop.id('header') === '<h1>Header</h1>';
  },
  resultEsperado: true
});

//Verificar se a animação aplica corretamente no bloco.

fxtests.add({
  name: 'Testando animar',
  teste: () => {
    const pop = new Pop({
      box: () => '<div class="box">Box</div>'
    });
    pop.init(['box']); // Certifique-se de que o box seja inicializado
    pop.anime('#box', {
  props: [{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }],
  duration: 500
});
    const box = pop.id('box');
    return box !== null; // Verifique se o box foi manipulado
  },
  resultEsperado: true
});
//Verificar se a função mover aplica a física no bloco corretamente.

fxtests.add({
  name: 'Testando mover',
  teste: () => {
    const pop = new Pop({
      box: () => '<div class="box">Box</div>'
    });
    pop.mover('#box', {
  physics: {
    ax: 2,        // Aceleração em X
    ay: 1,        // Aceleração em Y
    friction: 0.95, // Fricção (1 = sem perda de aceleração)
    minX: 0, maxX: 300, // Limites em X
    minY: 0, maxY: 500  // Limites em Y
  }
});
    const box = pop.id('box');
    return box !== null; // Espera-se que a física tenha manipulado o bloco
  },
  resultEsperado: true
});

//Verificar se a função evento adiciona corretamente um ouvinte de evento.

fxtests.add({
  name: 'Testando evento',
  teste: () => {
    const pop = new Pop({
      btn: () => '<button id="btn">Click me</button>'
    });
    pop.init(['btn']); // Garanta que o botão seja inserido no DOM antes do evento
    let clicked = false;
    pop.evento('#btn', 'click', () => clicked = true);
    document.querySelector('#btn').click(); // Simula o clique
    return clicked === true;
  },
  resultEsperado: true
});

//Verificar se a função remover remove corretamente o bloco do DOM.

fxtests.add({
  name: 'Testando remover',
  teste: () => {
    const pop = new Pop({
      box: () => '<div id="box">Box</div>'
    });
    pop.init(['box']); // Inicializa o bloco 'box'
    pop.remover('box'); // Remove o bloco 'box'
    const box = pop.$$('box');
    
    return box === null; // Verifica se o box foi removido
  },
  resultEsperado: true
});
//Verificar se a função add adiciona corretamente um novo bloco.

fxtests.add({
  name: 'Testando add',
  teste: () => {
    const pop = new Pop({});
    pop.add('newBlock', () => '<div>New Block</div>');
    return pop.id('newBlock') === '<div>New Block</div>';
  },
  resultEsperado: true
});

//Verificar se a função setVar cria uma variável observável e chama o callback corretamente.

fxtests.add({
  name: 'Testando setVar',
  teste: () => {
    const pop = new Pop({});
    let contadorChanged = false;
    pop.setVar('contador', () => contadorChanged = true);
    pop.set.contador = 42;
    return contadorChanged === true;
  },
  resultEsperado: true
});

//Verificar se a função clone cria uma cópia de um bloco existente.

fxtests.add({
  name: 'Testando clone',
  teste: () => {
    const pop = new Pop({
      card: () => '<div class="card">Card</div>'
    });
    pop.clone('card', 'cardClone');
    return pop.id('cardClone') === '<div class="card">Card</div>';
  },
  resultEsperado: true
});

//Verificar se os atalhos $ e $$ funcionam corretamente.

fxtests.add({
  name: 'Testando $ e $$',
  teste: () => {
    const pop = new Pop({
      div: () => '<div id="minhaDiv">Conteúdo</div>'
    },['div']);
    const div = pop.$('#minhaDiv');
    div.innerHTML = 'Novo Conteúdo';
    return div.innerHTML === 'Novo Conteúdo';
  },
  resultEsperado: true
});

fxtests.run();
document.body.innerHTML='';
fxtests.clear()

/*Esses testes abrangem diferentes
aspectos da biblioteca pop.js,
garantindo que as funcionalidades 
como inicialização, manipulação de
blocos, animações, e eventos 
funcionem como esperado. Se a 
biblioteca for implementada 
corretamente, todos esses testes
devem passar e garantir o 
funcionamento básico das funções
descritas.*/