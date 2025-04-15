class Bot_0x {
  constructor() {
    this.text = ""
  }
  
  log(text){
    console.log(
  "%c</0_0>: " + text,
  "font-family: monospace; font-size: 16px; color: #00ffcc; background: rgba(0, 0, 0, 0.58); padding: 8px 12px; border-radius: 5px;"
);
  }
  
  help(){ return `
    === Comandos Pop.js ===
    - help: mostra esta ajuda
    - select <selector>: seleciona elementos do DOM
    - css <selector>: mostra estilos computados
    - text <selector>: mostra o texto do elemento
    - html <selector>: mostra HTML interno
    - log <mensagem>: log com estilo Pop.js
    - github: abre o repositório do projeto
  `}
  
  select(selector){
    document.querySelectorAll(selector)
  }

  ver(selector){
    const el = document.querySelector(selector)
    const cor = el.style.background;
    el.style.background='rgba(25, 112, 172, 0.79)';
    setTimeout(() => el.style.background=cor,5000)
    
  }

 css(selector){
  const el = document.querySelector(selector);
  return el ? getComputedStyle(el) : 'Elemento não encontrado.';
}

text(selector){
  const el = document.querySelector(selector);
  return el ? el.textContent : 'Elemento não encontrado.';
}

html(selector){
    const el = document.querySelector(selector);
    return el ? el.innerHTML : 'Elemento não encontrado.';
  }
  

  github(){window.open('https://github.com/DanielFlux23/Pop.js', '_blank')}
}


const bot_0x = new Bot_0x();

bot_0x.log('digite bot_0x.help()')

let obj = {};