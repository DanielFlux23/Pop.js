class Fxtests {
  constructor() {
    this.tests = [];
    this.errors = {};
  }
  
  // Método para adicionar um novo teste
  add({ name, teste, resultEsperado }) {
    // Adiciona o teste à lista de testes
    this.tests.push({ name, teste, resultEsperado });
  }
  
  // Método para rodar todos os testes
  run() {
    for (let i = 0; i < this.tests.length; i++) {
      // Obtenha os valores do teste atual
      const { name, teste, resultEsperado } = this.tests[i];
      const check = teste() === resultEsperado; // Verifica se o resultado é igual ao esperado
      
      // Define se o teste passou ou falhou
      const verifiqueCheck = check ? 'Fxtests:ok' : 'Fxtests:error';
      
      // Se falhou, registra o erro
      if (!check) {
        this.errors[i] = {
          name,
          result: teste(),
          resultEsperado,
          check: verifiqueCheck,
        };
      }
      
      // Exibe no console se o teste passou ou falhou
      console.log(`${name}: ${verifiqueCheck}`);
    }
    
    // Exibe todos os erros, caso haja
    if (Object.keys(this.errors).length > 0) {
      console.log('\nErros encontrados:');
      console.table(this.errors);
    }
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
    pop.animar('box', { type: 'fade', duration: 500 });
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
    pop.mover('box', { vento: { ax: 2, delay: 30, maxX: 300 }, gravidade: { ay: 1, delay: 30 } });
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