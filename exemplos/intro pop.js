
 const titanDOM = new TitanDOM({
  header: () => `<h1>Bem-vindo ao TitanDOM.js!</h1>`,
  content: () => '<p><strong>TitanDOM.js</strong> é uma biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.</p>',
  metodos1:()=> ` 🛠 Métodos disponíveis

<strong>init(blocos)</strong>
<li> Inicializa e adiciona ao DOM os blocos passados, caso ainda não existam.</li>
<li> Exemplo:  </li>
  titanDOM.init(['blocoExemplo']);
<br> Parâmetros:  
  <li> blocos (Array): Lista dos blocos a serem adicionados.</li>
`,
metodos2:()=>`

<strong>show(blocos)</strong>
<li> Descrição: Atualiza o conteúdo dos blocos existentes no DOM.</li>
<li> Exemplo:  </li>
  titanDOM.show(['blocoExemplo']);
<br> Parâmetros:
  <li> blocos (Array): Lista dos blocos a serem atualizados. Se não passar nenhum bloco, ele atualiza todos.</li>

`,
titanDOM:()=> `<h1>Gostou?</h1>`,
  box:()=> `box`,
math: () => `<h1>cálculo matemático</h1>`,
  $blocoFuncao: () => ['math', () => Math.random() > 0.5 ? 'Sim' : 'Não'] // ['card',funcaoAnonima]
});
titanDOM.init(['header'])

//titanDOM.init(['card'],{text:'<h1>Bem-vindo ao TitanDOM.js!</h1>',data:'bom dia'})
titanDOM.show(['header'])
/*titanDOM.animar("header", {
  type: "rotate",
  duration: 1000,
  direction: 180
})
titanDOM.animar("header", {
  type: "bounce",
  duration: 500, 
  direction: 1 // O valor 1 representa a intensidade do movimento de quicar
})
titanDOM.animar("header", {
  type: "scale",
  duration: 500,
  direction: 0.7 // O valor 1 representa a intensidade do movimento de quicar
})
titanDOM.animar("header", { type: "fade", duration: 1000 });
setTimeout(() => titanDOM.show(['content']), 3000);
setTimeout(() => titanDOM.show(['metodos1']), 6000);
setTimeout(() => titanDOM.show(['metodos2']), 9000);
titanDOM.animar("header",{
  type:'rotate',
  direction:6,
  delay:1000,
  
})*/

titanDOM.mover('header',{
  posicaoInicial:{x:3, ax:7,y:10,ay:5, delay:30,maxX:320,maxY:710},

})

titanDOM.evento('header','click', () => titanDOM.init(['titanDOM']))

setTimeout(() => {
  document.querySelector("link[rel='stylesheet']").href = "style.css";
}, 1000); // Muda o CSS após 5 segundos