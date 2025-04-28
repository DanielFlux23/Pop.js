class Bot_0x {
  constructor() {
    this.text = "";
    this.style = "font-family: monospace; font-size: 16px; color: lime; background: rgba(0, 0, 0, 0.58); padding: 8px 12px; border-radius: 5px;";
  }
  
  log(text) {
    console.log(`%c</0_0>: ${text}`, this.style);
  }
  
  help() {
    console.log(`%c
    === Comandos Pop.js ===
    - help(): mostra esta ajuda
    - select('<selector>'): seleciona e retorna elementos
    - inspect('<selector>'): mostra o elemento no console
    - css('<selector>'): mostra estilos computados
    - text('<selector>'): mostra texto interno
    - html('<selector>'): mostra HTML interno
    - ver('<selector>'): destaca visualmente o elemento
    - log('<mensagem>'): log com estilo Pop.js
    - github(): abre o repositório do projeto
    `, this.style);
  }
  
  select(selector) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return this.log("Nada encontrado com esse seletor.");
    this.log(`${els.length} elemento(s) selecionado(s).`);
    return els;
  }
  
  inspect(selector) {
    const el = document.querySelector(selector);
    if (!el) return this.log("Elemento não encontrado.");
    console.log(el);
    return el;
  }
  
  ver(selector) {
    const el = document.querySelector(selector);
    if (!el) return this.log("Elemento não encontrado.");
    const prevStyle = el.style.outline;
    el.style.outline = "2px dashed rgba(25, 112, 172, 0.79)";
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.style.outline = prevStyle, 5000);
  }
  
  css(selector) {
    const el = document.querySelector(selector);
    return el ? getComputedStyle(el) : "Elemento não encontrado.";
  }
  
  text(selector) {
    const el = document.querySelector(selector);
    return el ? el.textContent : "Elemento não encontrado.";
  }
  
  html(selector) {
    const el = document.querySelector(selector);
    return el ? el.innerHTML : "Elemento não encontrado.";
  }
  
  github() {
    window.open("https://github.com/DanielFlux23/Pop.js", "_blank");
  }
}
const bot_0x = new Bot_0x();

bot_0x.log('digite bot_0x.help()')
