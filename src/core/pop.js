class Pop {
  constructor(blocos = {}, opens = []) {
    this.blocos = blocos; // Mapeamento de nomes para funções de renderização
    this.chaves = Object.keys(blocos); // Todas as chaves iniciais
    this.grupes = {}
    this.set = {}; // Armazena variáveis observáveis
    this.clonagens = {}; // Controla duplicações de blocos
    this.animacoes = {}; // Gerencia animações em fila
    
    // Inicializa blocos, dependendo do valor de 'opens'
    this.init(opens === 'initPop' ? this.chaves : opens);
    
    return this;
  }
  
  /**
   * Inicializa e insere no DOM os blocos especificados, se ainda não existirem.
   */
  init(blocos = [], { text = '', data = null,force = false, target = document.body, onRender = null } = {}) {
    for (let chave of blocos) {
      let conteudo;
      
      // Caso a chave seja um clone (ex: 'box&')
      if (chave.includes('&')) {
        const chaveBase = chave.replace('&', '');
        const count = (this.clonagens[chaveBase] = (this.clonagens[chaveBase] || 0) + 1);
        conteudo = text ?? this.blocos[chaveBase](data);
        chave = `${chaveBase}${count}`;
        this.add(chave, this.blocos[chaveBase]);
      }
      
      // Se já foi inserido ou o bloco não existe, pula
      if (!this.blocos[chave] || document.getElementById(chave)) continue;
      
      const elemento = document.createElement('div');
      elemento.id = chave;
      
      if (chave.includes('$')) {
        // Caso especial: referência a outro bloco
        conteudo = this.id(this.blocos[chave](data));
      } else {
        conteudo = text || this.blocos[chave](data);
      }
      
      // Adiciona conteúdo ao elemento
      if (conteudo instanceof HTMLElement) {
        elemento.appendChild(conteudo);
      } else {
        elemento.innerHTML = conteudo;
      }
      
      target.appendChild(elemento);
      if(onRender) onRender(elemento,chave); // função que executar durante a renderização
    }
    
    return this;
  }
  /**
   * permite adiciona blocos de forma mais flexível 
   */
  add(nomeOuObj, callback) {
    if (typeof nomeOuObj === 'object') {
      for (let chave in nomeOuObj) {
        this.blocos[chave] = nomeOuObj[chave];
      }
    } else {
      if (this.blocos[nomeOuObj]) {
        console.warn(`Bloco '${nomeOuObj}' já existe. Será sobrescrito.`);
      }
      this.blocos[nomeOuObj] = callback;
    }
    this.chaves = Object.keys(this.blocos);
    return this;
  }
  /**
   * adicionar grupos de blocos
   */
  grupe(nome, blocos){
   this.grupes[nome]=blocos;
   return this;
  }
  
  absoluteExiber(blocos=[]){
    for (let i = 0; i < this.chaves.length; i++) {
      // Tab to edit
    if(!this.chaves[i]) this.remover(blocos[i])
    }
  }
  
  setVar(nomeVariavel, callback) {
    Object.defineProperty(this.set, nomeVariavel, {
      get() {
        return this._valor;
      },
      set(novoValor) {
        console.log([nomeVariavel])
        //[nomeVariavel]=this.set[nomeVariavel]
        callback()
      }
    });
    return this.set;
  }
  
  setShow(nomeVariavel, blocos) {
    const mythis = this;
    
    Object.defineProperty(this.set, nomeVariavel, {
      get() {
        return this._valor;
      },
      set(novoValor) {
        console.log(mythis)
        // mythis.show([blocos])
      }
    });
    
    
  }
  
  clone(blocoParaClona, nomeDoBloco) {
    if (!this.blocos[blocoParaClona]) console.warn('parece que este bloco não existir: ' + blocoParaClona);
    
    const nome = nomeDoBloco || blocoParaClona;
    // Inicializamos ou incrementamos o contador de clonagens de forma mais clara
    const numeroDeClonagens = (this.clonagens[blocoParaClona] = (this.clonagens[blocoParaClona] || 0) + 1);
    // Atualizamos a chave com o número de clonagens
    const chave = nome;
    // Registramos a chave clonada
    this.add(chave, this.blocos[blocoParaClona]);
    this.init([chave], { text: this.blocos[blocoParaClona]() })
  }
  
  // Objeto que gerencia as animações em fila para cada elemento
  
  animar(bloco, config = {}) {
    // Inicializa a fila para o bloco, se ainda não existir
    if (!this.animacoes[bloco]) {
      this.animacoes[bloco] = { fila: [], emExecucao: false };
    }
    
    // Adiciona a configuração da animação na fila
    this.animacoes[bloco].fila.push(config);
    
    // Se já há uma animação em execução, aguarde
    if (this.animacoes[bloco].emExecucao) return;
    
    this._executarProxima(bloco);
  }
  
  _executarProxima(bloco) {
    const dados = this.animacoes[bloco];
    
    if (!dados || dados.fila.length === 0) {
      dados.emExecucao = false;
      return;
    }
    
    dados.emExecucao = true;
    const config = dados.fila.shift(); // Pega a próxima animação da fila
    const elemento = document.getElementById(bloco);
    
    if (!elemento) {
      console.error(`Elemento com id "${bloco}" não encontrado.`);
      this._executarProxima(bloco); // Continua a fila mesmo em caso de erro
      return;
    }
    
    const {
      type = "fade",
        duration = 500,
        easing = "ease-in-out",
        delay = 0,
        direction = 0
    } = config;
    
    // Obtém os keyframes de acordo com o tipo da animação
    const getKeyframes = () => {
      switch (type) {
        case "rotate":
          const rotateValue = isNaN(direction) ? 360 : Number(direction);
          return [{ transform: "rotate(0deg)" }, { transform: `rotate(${rotateValue}deg)` }];
          
        case "scale":
          const scaleValue = isNaN(direction) ? 1.5 : Number(direction);
          return [{ transform: "scale(1)" }, { transform: `scale(${scaleValue})` }];
          
        case "fade":
          return [{ opacity: 0 }, { opacity: 1 }];
          
        case "slide":
          const slideDirections = {
            up: "translateY(-100%)",
            down: "translateY(100%)",
            left: "translateX(-100%)",
            right: "translateX(100%)"
          };
          return [{ transform: slideDirections[direction] || "translateX(0)" }, { transform: "translateX(0)" }];
          
        case "bounce":
          const bounceValue = isNaN(direction) ? 20 : Number(direction) * 10;
          return [
            { transform: "translateY(0)" },
            { transform: `translateY(${bounceValue}px)` },
            { transform: "translateY(0)" }
          ];
          
        default:
          return [{ opacity: 0 }, { opacity: 1 }];
      }
    };
    
    const keyframes = getKeyframes();
    const options = { duration, delay, easing, iterations: 1, fill: "forwards" };
    
    // Cria a animação
    const anim = elemento.animate(keyframes, options);
    
    anim.onfinish = () => {
      dados.emExecucao = false;
      this._executarProxima(bloco); // Executa a próxima animação da fila
    };
  }
  css(css){
    const styleTag = document.createElement('style');

    styleTag.innerHTML = css;
document.head.appendChild(styleTag);
}
  mover(bloco, config = {}) {
    
    const elemento = this.$$(bloco);
    
    if (!elemento) return console.error(`Elemento ${bloco} não encontrado`);
    
    let estado = { x: 0, y: 0 }; // Estado global do bloco
    let pausado = false; // Controle de pausa
    
    Object.keys(config).forEach((chave) => {
      const obj = config[chave];
      
      if (!obj || typeof obj !== 'object') return;
      
      // Definir valores padrão
      obj.x = obj.x ?? 0;
      obj.y = obj.y ?? 0;
      obj.ax = obj.ax ?? 0;
      obj.ay = obj.ay ?? 0;
      obj.delay = obj.delay ?? 1000;
      obj.minX = obj.minX ?? -Infinity;
      obj.maxX = obj.maxX ?? Infinity;
      obj.minY = obj.minY ?? -Infinity;
      obj.maxY = obj.maxY ?? Infinity;
      obj.friccao = obj.friccao ?? 1; // 1 = sem fricção, menor que 1 reduz a aceleração
      obj.reset = obj.reset ?? false; // Se true, reseta a posição depois de um tempo
      obj.pause = obj.pause ?? false; // Se true, pausa o movimento
      
      setInterval(() => {
        if (pausado || obj.pause) return;
        
        // Aplica aceleração com fricção
        obj.ax *= obj.friccao;
        obj.ay *= obj.friccao;
        
        estado.x += obj.ax;
        estado.y += obj.ay;
        
        // Respeita os limites
        estado.x = Math.max(obj.minX, Math.min(obj.maxX, estado.x));
        estado.y = Math.max(obj.minY, Math.min(obj.maxY, estado.y));
        
        // Atualiza a posição do elemento
        elemento.style.transform = `translate(${estado.x}px, ${estado.y}px)`;
        
        // Reseta a posição após 3 segundos se "reset" for true
        if (obj.reset) {
          setTimeout(() => {
            estado.x = obj.x;
            estado.y = obj.y;
            elemento.style.transform = `translate(${estado.x}px, ${estado.y}px)`;
          }, 3000);
        }
        
      }, obj.delay);
    });
    
    // Função para pausar e retomar
    this.pausar = () => (pausado = true);
    this.continuar = () => (pausado = false);
  }
  
  style(bloco) {
    return this.$$(bloco).style
  }
  
  evento(seletor, typeEvento, funcao) {
    const elementos = document.querySelectorAll(seletor);
    
    if (elementos.length === 0) {
      console.warn(`Nenhum elemento encontrado para o seletor: ${seletor}`);
      return;
    }
    
    elementos.forEach(elemento => elemento.addEventListener(typeEvento, funcao));
  }
  
  /**
   * Obtém o conteúdo de um bloco, retornando uma mensagem caso não exista.
   */
  id(bloco) {
    try {
      if (typeof bloco === 'string') {
        if (bloco.includes('$')) {
          const chave = this.blocos[bloco]?.();
          return this.blocos[chave]?.() || this._erro(bloco);
        }
        return this.blocos[bloco]?.() || this._erro(bloco);
      }
      
      if (Array.isArray(bloco)) {
        const [chave, fn] = bloco;
        return (this.blocos[chave]?.() || '') + (fn?.() || '');
      }
      
      return this._erro(bloco);
    } catch (e) {
      return `<span style="color:red;">Erro no bloco: ${bloco}</span>`;
    }
  }
  
  _erro(bloco) {
    console.error(`Erro ao acessar o bloco: ${bloco}`);
    return `<span style="color:red;">Erro ao acessar o bloco: ${bloco}</span>`;
  }
  $(elemento) {
    return document.querySelector(elemento)
  }
  
  $$(elemento) {
    return document.getElementById(elemento)
  }
  
  remover(bloco = '') {
    if (bloco > 1) {
      bloco.forEach((index, array) => {
        document.getElementById(array[index]).remove() || `<span style='color:red;'>Error 2 com: ${bloco}</span>`;
        
      })
    }
    document.getElementById(bloco).remove() || `<span style='color:red;'>Error 2 com: ${bloco}</span>`;
  }
  
  /**
   * Atualiza o conteúdo dos blocos existentes no DOM, inicializando se necessário.
   */
  show(blocos = []) {
    const atualizados = [];
    blocos = blocos.length ? blocos : this.chaves;
    
    for (const chave of blocos) {
      if (!this.blocos[chave]) continue;
      const atualizado = this._renderBlock(chave);
      if (atualizado) atualizados.push(chave);
    }
    
    return atualizados;
  }
  
  _renderBlock(chave) {
    const elemento = document.getElementById(chave);
    const conteudo = this.blocos[chave]();
    
    if (!elemento) {
      this.init([chave]);
      return true;
    }
    
    if (conteudo instanceof HTMLElement) {
      elemento.innerHTML = '';
      elemento.appendChild(conteudo);
    } else {
      elemento.innerHTML = conteudo;
    }
    
    return true;
  }
}


console.log('%c pop.js carregado... digite $pop("help")', 'color: lime; background: black; font-weight: bold; padding: 2px;');

const comandosPop = {
  help: () => `
    === Comandos Pop.js ===
    - help: mostra esta ajuda
    - select <selector>: seleciona elementos do DOM
    - css <selector>: mostra estilos computados
    - text <selector>: mostra o texto do elemento
    - html <selector>: mostra HTML interno
    - log <mensagem>: log com estilo Pop.js
    - github: abre o repositório do projeto
  `,
  
  select: (selector) => document.querySelectorAll(selector),
  
  css: (selector) => {
    const el = document.querySelector(selector);
    return el ? getComputedStyle(el) : 'Elemento não encontrado.';
  },
  
  text: (selector) => {
    const el = document.querySelector(selector);
    return el ? el.textContent : 'Elemento não encontrado.';
  },
  
  html: (selector) => {
    const el = document.querySelector(selector);
    return el ? el.innerHTML : 'Elemento não encontrado.';
  },
  
  log: (msg) => console.log('%c[Pop]', 'color: cyan; font-weight: bold;', msg),
  
  github: () => window.open('https://github.com/DanielFlux23/Pop.js', '_blank')
};

const $pop = (cmd, arg) => {
  const fn = comandosPop[cmd];
  if (typeof fn === 'function') {
    return fn(arg);
  }
  return 'Comando inválido. Use $pop("help")';
};
const $ = (element) => {
  return document.getElementById(element);
}

const state = () => {
  // this.show([bloco])
  return obj;
}

let obj = {};