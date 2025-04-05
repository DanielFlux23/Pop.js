//const state = Pop.setVar('name',() => pop.show(['titulo']));

state().name = prompt('qual é o seu nome?') || '';
let clicks = 0;
const pop = new Pop({
  titulo: () => `<h1>bem vindo ${obj.name}!</h1>`,
  time: () => `<h4>Segundos: ${new Date().getSeconds()}</h4>`,
  contador: () => `você clicou ${clicks} vezes`,
  butao: () => `<h3>+1<h3>`
})

pop.init(['titulo', 'time', 'contador', 'butao'], {
  onRender: (el, chave) => {
    el.style.border = '2px dashed blue';
    //console.log(`Bloco ${chave} foi renderizado`, el);
  }
})

//state.name=3
/*const state = pop.setShow('name','titulo');
console.log(state.name=7
)*/
setInterval(() => { pop.show(['time']) }, 1000)
pop.evento('#butao', 'click', () => { clicks++;
  pop.show(['contador']) })
  /*
const alvo = { nome: "Dani" };

const proxy = new Proxy(alvo, {
  get(obj, prop) {
    console.log(`Acessando ${prop}`);
    return obj[prop];
  },
  set(obj, prop, valor) {
    console.log(`Alterando ${prop} para ${valor}`);
    obj[prop] = valor;
    return true;
  }
});

proxy.nome; // Loga: Acessando nome
proxy.nome = "Lua"; // Loga: Alterando nome para Lua*/