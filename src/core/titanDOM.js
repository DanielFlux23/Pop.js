class TitanDOM {
  constructor(blocos = {}, opens = []) {
    this.blocos = blocos; // Mapeamento de nomes para funções de renderização
    this.chaves = Object.keys(blocos); // Todas as chaves iniciais
    this.grupes = {}
    this.set = {}; // Armazena variáveis observáveis
    this.clonagens = {}; // Controla duplicações de blocos
    this.configAnimacoes = {animacoes:[],timing:{}}; // Gerencia animações em fila
    
    // Inicializa blocos, dependendo do valor de 'opens'
    this.init(opens === 'initTitanDOM' ? this.chaves : opens);
    
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
  
  timeGrupe(grupo,time,callback){
    const grupe = this.grupes[grupo];
    
    console.log(grupe)
    for (let i = 0; i < grupe.length; i++) {
      // Tab to edit
      setTimeout(callback,time,grupe[i])
    }
  }
  
  
  absoluteExiber(blocos=[]){
    for (let i = 0; i < this.chaves.length; i++) {
      // Tab to edit
    if(!this.chaves[i]) this.remover(blocos[i])
    }
  }
  
  setVar(nomeVariavel, callback) {
const proxy = new Proxy(data, {
  get(target, prop) {
    //console.log(`Acesso a propriedade "${prop}"`);
    return target[prop];
  },
  set(target, prop, value) {
  //  console.log(`Mudando "${prop}" para "${value}"`);
    target[prop] = value;
    callback(value)
    return true;
  }
});

    return proxy;
  }
  
  setShow(nomeVariavel, blocos) {
    const chamarShow = (bloco) => this.show([bloco]);
    const proxy = new Proxy(data, {
  get(target, prop) {
    //console.log(`Acesso a propriedade "${prop}"`);
    return target[prop];
  },
  set(target, prop, value) {
    //  console.log(`Mudando "${prop}" para "${value}"`);
    target[prop] = value;
chamarShow(nomeVariavel)
    return true;
  }
});
return proxy;
  }
  
  watch(prop, callback) {
  let val = this._data[prop];
  Object.defineProperty(this._data, prop, {
    get: () => val,
    set: (novo) => {
      val = novo;
      callback(novo);
      if (this._bindings[prop]) {
        this._bindings[prop].forEach(el => el.textContent = novo);
      }
    }
  });
}

component(nome, renderFn) {
  this._components = this._components || {};
  this._components[nome] = renderFn;
}

mount(nome, target, props = {}) {
  const html = this._components[nome](props);
  const el = document.createElement('div');
  el.innerHTML = html;
  target.appendChild(el.firstElementChild);
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
 anime(bloco, config) {
   // let [animacoes,timing] = this.configAnimacoes;
   let animacoes = [];
   let timing = {};
   
   let elemento = document.querySelector(bloco);
   
   if (!elemento) {
     console.error(`Elemento '${bloco}' não encontrado.`);
     return;
   }
   
   // API fluente: quando só o seletor é passado
   if (!config) {
     const funcoes = {
       add: (props) => {
         animacoes.push(props);
         return funcoes;
       },
       config: (configs) => {
         timing = { ...timing, ...configs };
         funcoes.play()
         return funcoes;
       },
       onfinish: null,
       play: () => {
         if (animacoes.length === 0) {
           console.warn('Nenhuma animação adicionada.');
           return;
         }
         console.log()
         const player = elemento.animate(animacoes, timing);
         if (typeof funcoes.onfinish === 'function') {
           player.onfinish = funcoes.onfinish;
         }
         return player;
       }
     };
     return funcoes;
   }
   
   // Modo declarativo
   if (!config.props) {
     console.warn('config.props está indefinido ou vazio.');
     return;
   }
   
   const keyframes = config.props;
   timing = {
     duration: config.duration || 1000,
     easing: config.easing || 'linear',
     fill: config.fill || 'forwards'
   };
   
   const player = elemento.animate(keyframes, timing);
   player.onfinish = config.onfinish || null;
   return player;
 }  
 
  music({
  freq,
  oscType = 'sine',
  duracao = 1
}) {
  const audioCtx = new AudioContext();
  
  const osc = audioCtx.createOscillator();
  osc.type = oscType;
  osc.frequency.value = freq;
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duracao);
}
  
html(bloco,html){
  this.$('#'+bloco).innerHTML=html;html
return this;
}

  css(css){
    const styleTag = document.createElement('style');

    styleTag.innerHTML = css;
document.head.appendChild(styleTag);
}
 mover(selector, config = {}) {
  const el = document.querySelector(selector);
  if (!el) return console.error(`Elemento ${selector} não encontrado`);
  
  const startTime = performance.now();
  const duration = config.duration || 1000;
  const usePhysics = !!config.physics;
  const estado = { x: config.x ?? 0, y: config.y ?? 0 };
  let pausado = false;
  
  const largura = el.offsetWidth;
  const altura = el.offsetHeight;
  
  const loop = (now) => {
    if (pausado) return requestAnimationFrame(loop);
    
    const t = now - startTime;
    const p = Math.min(t / duration, 1);
    
    let x, y;
    
    if (usePhysics) {
      const f = config.physics.friction ?? 1;
      config.physics.ax *= f;
      config.physics.ay *= f;
      estado.x += config.physics.ax;
      estado.y += config.physics.ay;
      
      const minX = config.physics.minX ?? -Infinity;
      const maxX = (config.physics.maxX ?? Infinity) - largura;
      const minY = config.physics.minY ?? -Infinity;
      const maxY = (config.physics.maxY ?? Infinity) - altura;
      
      // Rebote nas bordas (com tamanho do elemento considerado)
      if (estado.x <= minX || estado.x >= maxX) {
        config.physics.ax *= -1;
      }
      if (estado.y <= minY || estado.y >= maxY) {
        config.physics.ay *= -1;
      }
      
      // Limitar dentro das bordas
      estado.x = Math.max(minX, Math.min(maxX, estado.x));
      estado.y = Math.max(minY, Math.min(maxY, estado.y));
      
      x = estado.x;
      y = estado.y;
    } else {
      x = config.x ? config.x(p) : 0;
      y = config.y ? config.y(p) : 0;
    }
    
    el.style.transform = `translate(${x}px, ${y}px)`;
    
    if (p < 1 || usePhysics) requestAnimationFrame(loop);
  };
  
  requestAnimationFrame(loop);
  
  return {
    pausar: () => (pausado = true),
    continuar: () => (pausado = false),
    resetar: () => {
      estado.x = config.x ?? 0;
      estado.y = config.y ?? 0;
    }
  };
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
  
   remover(bloco = '', debug=false) {
  if (!bloco) return;
  
  // Se for array, remove cada item
  if (Array.isArray(bloco)) {
    bloco.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.remove();
      } else {
        if(debug) console.error(`Elemento com id "${id}" não encontrado.`);
      }
    });
  } else {
    // Se for string (id único), remove diretamente
    const el = document.getElementById(bloco);
    if (el) {
      el.remove();
    } else {
      if(debug) console.error(`Elemento com id "${bloco}" não encontrado.`);
    }
  }
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

let data = {
  
}