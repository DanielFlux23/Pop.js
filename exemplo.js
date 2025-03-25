let name = prompt('qual é o seu nome?')||'';
let clicks = 0;
const pop = new Pop({
  titulo:() => `<h1>bem vindo ${name}!</h1>`,
  contador:() => `você clicou ${clicks}`,
  butao:() => `<h3>+1<h3>`
})

pop.init(['titulo','contador','butao'])


pop.evento('#butao','click',() => {clicks++;pop.show(['contador'])})