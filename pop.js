class Pop {
  constructor(blocos = {}, opens = []) {
    this.blocos = blocos;
    this.chaves = Object.keys(blocos);
    this.clonagens = {};
    this.animacoes = {};
    this.init(opens === 'initPop' ? this.chaves : opens);
    return this;
  }
  
  /**
   * Inicializa e insere no DOM os blocos especificados, se ainda não existirem.
   */
  init(blocos = [], { text = '', data = null } = {}) {
    for (let chave of blocos) {
      let conteudo;
      
      if (chave.includes('&')) {
        // Se a chave tem "&", processamos de maneira diferente
        const chaveAClona = chave.replace('&', '');
        // Inicializamos ou incrementamos o contador de clonagens de forma mais clara
        const numeroDeClonagens = (this.clonagens[chaveAClona] = (this.clonagens[chaveAClona] || 0) + 1);
        // Utilizamos o operador de coalescência nula para garantir um valor não nulo para 'conteudo'
        conteudo = text ?? this.blocos[chaveAClona](data);
        
        // Atualizamos a chave com o número de clonagens
        chave = `${chaveAClona}${numeroDeClonagens}`;
        
        // Registramos a chave clonada
        this.add(chave, this.blocos[chaveAClona]);
      }
      if (!this.blocos[chave] || document.getElementById(chave)) continue;
      const elemento = document.createElement('div');
      elemento.id = chave;
      
      
      if (chave.includes('$')) {
        // Se a chave tem "$", processamos de maneira diferente
        conteudo = this.id(this.blocos[chave](data)); //this.blocos[chave];
      }
      else {
        // Caso normal
        conteudo = text || this.blocos[chave](data);
      }
      
      // Adiciona o conteúdo ao elemento
      if (conteudo instanceof HTMLElement) {
        elemento.appendChild(conteudo);
      } else {
        elemento.innerHTML = conteudo;
      }
      
      document.body.appendChild(elemento);
    }
    return this;
  }
  /**
   * permite adiciona blocos de forma mais flexível 
   */
  add(nome, callback) {
    this.blocos[nome] = callback;
    this.chaves = Object.keys(this.blocos);
    return this;
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
  
  /*mover(bloco, config = {}) {
    const elemento = this.$$(bloco);
    
    if (!elemento) return console.error(`Elemento ${bloco} não encontrado`);
    
    let estado = { x: 0, y: 0 }; // Estado global do bloco
    
    Object.keys(config).forEach((chave) => {
      const obj = config[chave];
      
      if (!obj || typeof obj !== 'object') return;
      
      // Definir valores padrão
      obj.x = obj.x ?? 0;
      obj.y = obj.y ?? 0;
      obj.ax = obj.ax ?? 0;
      obj.ay = obj.ay ?? 0;
      obj.delay = obj.delay ?? 1000;
      
      setInterval(() => {
        // Atualiza a posição global
        estado.x += obj.ax;
        estado.y += obj.ay;
        
        // Atualiza o estilo do elemento
        elemento.style.transform = `translate(${estado.x}px, ${estado.y}px)`;
      }, obj.delay);
    });
  }*/
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
    if (bloco.includes('$')) {
      return this.blocos[this.blocos[bloco]()]() || `<span style='color:red;'>Error 2 com: ${bloco}</span>`;
    }
    if (!Array.isArray(bloco)) {
      return this.blocos[bloco]() || `<span style='color:red;'>Error 2 com: ${bloco}</span>`;
    }
    
    const [key, fn] = bloco;
    return this.blocos[key]?.() + (fn ? fn() : '') || `Error ${key} 2.`;
  }
  
  $(elemento) {
    return document.getSelection(elemento)
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
    blocos = blocos.length ? blocos : this.chaves;
    
    for (const chave of blocos) {
      const elemento = document.getElementById(chave);
      
      if (!this.blocos[chave]) continue;
      
      let conteudo = this.blocos[chave]();
      if (elemento) {
        if (conteudo instanceof HTMLElement) {
          elemento.innerHTML = '';
          elemento.appendChild(conteudo);
        } else {
          elemento.innerHTML = conteudo;
        }
      } else {
        this.init([chave]);
      }
    }
    return this;
  }
}