/*data.contador=0
const pop = new Pop({
  contador:() => `${data.contador}`,
  click:() => `<button id="btn">+1</button>`
},['contador','click'])

const setContador = pop.setVar('contador',(nova) => {
  pop.show(['contador'])
})

pop.evento('#btn','click',() => {
  setContador.contador++;
})




*/
// popjs
data = { contador: 0 }

const pop = new Pop({
  contador: () => `${data.contador}`,
  click: () => `<button id="btn">+1</button>`
}, ['click'])


const setContador = pop.setShow('contador')

pop.evento('#btn', 'click', () => {
  setContador.contador++;
  })