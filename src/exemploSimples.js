
let name = prompt('qual é o seu nome?') || '';
let clicks = 0;
const pop = new Pop({
  titulo: () => `<h1>bem vindo ${name}!</h1>`,
  time: () => `<h4>Segundos: ${new Date().getSeconds()}</h4>`,
  contador: () => `você clicou ${clicks} vezes`,
  butao: () => `<h3>+1<h3>`
})

pop.init(['titulo', 'time', 'contador', 'butao'])

setInterval(() => { pop.show(['time']) }, 1000)
pop.evento('#butao', 'click', () => { clicks++;
  pop.show(['contador']) })
  
