/*data.contador=0
const titanDOM = new TitanDOM({
  contador:() => `${data.contador}`,
  click:() => `<button id="btn">+1</button>`
},['contador','click'])

const setContador = titanDOM.setVar('contador',(nova) => {
  titanDOM.show(['contador'])
})

titanDOM.evento('#btn','click',() => {
  setContador.contador++;
})




*/
// titanDOMjs
data = { contador: 0 }

const titanDOM = new TitanDOM({
  contador: () => `${data.contador}`,
  click: () => `<button id="btn">+1</button>`
}, ['click'])


const setContador = titanDOM.setShow('contador')

titanDOM.evento('#btn', 'click', () => {
  setContador.contador++;
  })