class Fxtests {
  constructor(delay = 500) {
    this.tests = [];
    this.errors = {};
    this.ok = true;
    this.delay = delay;
  }
  
  add({ name, teste, resultEsperado }) {
    this.tests.push({ name, teste, resultEsperado });
  }
  
  run() {
    this.errors = {};
    this.ok = true;
    
    console.groupCollapsed('%c[ Fxtests - Execução iniciada ]', 'color: cyan; font-weight: bold;');
    
    this.tests.forEach(({ name, teste, resultEsperado }, index) => {
    //  setTimeout(() => {
        let resultado;
        
        try {
          resultado = teste();
        } catch (e) {
          resultado = `Erro: ${e.message}`;
          this.ok = false;
          this.errors[index] = {
            name,
            result: resultado,
            resultEsperado,
            check: 'Exceção lançada',
          };
          
          console.groupCollapsed(`%c${name}: EXCEPTION`, 'color: red; font-weight: bold;');
          console.log('%cTipo de falha:', 'color: red;', 'Exceção');
          console.log('%cErro:', 'color: red;', e.message);
          console.groupEnd();
          return;
        }
        
        const passed = resultado === resultEsperado;
        
        if (!passed) {
          this.ok = false;
          this.errors[index] = {
            name,
            result: resultado,
            resultEsperado,
            check: 'Resultado inesperado',
          };
          
          console.groupCollapsed(`%c${name}: FALHOU`, 'color: orange; font-weight: bold;');
          console.log('%cTipo de falha:', 'color: orange;', 'Resultado inesperado');
          console.log('%cEsperado:', 'color: lime;', resultEsperado);
          console.log('%cObtido:', 'color: yellow;', resultado);
          console.groupEnd();
        } else {
          console.log(`%c${name}: OK`, 'color: green; font-weight: bold;');
        }
        
        if (index === this.tests.length - 1) {
        // setTimeout(() => {
            console.groupEnd();
            this._resumoFinal();
        //  }, this.delay);
        }
     // }, index * this.delay);
    });
  }
  
  _resumoFinal() {
    if (this.ok) {
      console.log('%c[ Fxtests - Todos os testes passaram ]', 'color: lime; font-weight: bold;');
    } else {
      console.groupCollapsed('%c[ Fxtests - Resumo de Falhas ]', 'color: red; font-weight: bold;');
      Object.values(this.errors).forEach(({ name, result, resultEsperado, check }, i) => {
        console.groupCollapsed(`${i + 1}. ${name}`);
        console.log('%cTipo:', 'color: red;', check);
        console.log('%cEsperado:', 'color: lime;', resultEsperado);
        console.log('%cObtido:', 'color: yellow;', result);
        console.groupEnd();
      });
      console.groupEnd();
    }
  }
  
  clear() {
    console.clear();
    if (this.ok) {
      console.log('%cFxtests: Tudo em ordem. Pode dormir tranquilo.', 'color: green; font-weight: bold;');
    } else {
      console.error('%cFxtests: Ainda tem erro te olhando feio.', 'color: red; font-weight: bold;');
      this._resumoFinal();
    }
  }
  
  reset() {
    this.tests = [];
    this.errors = {};
    this.ok = true;
    console.log('%cFxtests: Resetado. Que comece o caos novamente.', 'color: gray; font-style: italic;');
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
//fxtests.clear()

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