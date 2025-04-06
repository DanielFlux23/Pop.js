export function popExtra(pop) {
  
  // === 1. watch: Observa mudanças em elementos DOM ===
  pop.watch = (selector, callback) => {
    const el = document.querySelector(selector);
    if (!el) return console.warn('Elemento não encontrado para watch:', selector);
    
    const observer = new MutationObserver(() => callback(el));
    observer.observe(el, { childList: true, subtree: true });
    return observer;
  };
  
  // === 2. input: ligação direta input -> variável ===
  pop.input = (id, callback) => {
    const el = document.getElementById(id);
    if (!el) return console.warn('Input não encontrado:', id);
    el.addEventListener('input', e => callback(e.target.value));
  };
  
  // === 3. when: render condicional ===
  pop.when = (condicao, bloco) => {
    if (typeof condicao === 'function' ? condicao() : condicao) {
      pop.init([bloco]);
    } else {
      pop.remover(bloco);
    }
  };
  
  // === 4. each: render repetitivo ===
  pop.each = (arr, fn) => {
    arr.forEach((item, i) => {
      const nome = `item${i}`;
      pop.add(nome, () => fn(item));
      pop.init([nome]);
    });
  };
  
  // === 5. load: carrega conteúdo externo ===
  pop.load = async (url, target) => {
    const res = await fetch(url);
    const html = await res.text();
    const el = document.getElementById(target) || document.querySelector(target);
    if (el) el.innerHTML = html;
  };
  
  // === 6. toggle: mostra/oculta ===
  pop.toggle = (id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = (el.style.display === 'none' ? '' : 'none');
  };
  
  // === 7. bindVarToDOM: conecta variável ao DOM ===
  pop.bindVarToDOM = (varName, selector, prop = 'textContent') => {
    pop.setVar(varName, () => {
      const el = document.querySelector(selector);
      if (el) el[prop] = pop.set[varName];
    });
  };
  
  // === 8. debug: mostra tudo ===
  pop.debug = () => {
    console.log('%c[Pop Debug]', 'color: magenta; font-weight: bold;');
    console.log('Blocos:', Object.keys(pop.blocos || {}));
    console.log('SetVars:', pop.set);
    console.log('DOM ativo:', document.body.innerHTML.slice(0, 300), '...');
  };
  
  // === 9. middleware: intercepta blocos ===
  pop.middleware = (fn) => {
    const originalAdd = pop.add.bind(pop);
    pop.add = (nome, cb) => originalAdd(nome, () => fn(cb(), nome));
  };
  
  // === 10. export/import ===
  pop.export = () => JSON.stringify(pop.blocos);
  pop.import = (json) => {
    const blocos = JSON.parse(json);
    Object.entries(blocos).forEach(([k, v]) => pop.add(k, v));
  };
  
  return pop;
}