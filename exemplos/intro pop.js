
 const pop = new Pop({
  header: () => `<h1>Bem-vindo ao Pop.js!</h1>`,
  content: () => '<p><strong>Pop.js</strong> é uma biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.</p>',
  metodos1:()=> ` 🛠 Métodos disponíveis

<strong>init(blocos)</strong>
<li> Inicializa e adiciona ao DOM os blocos passados, caso ainda não existam.</li>
<li> Exemplo:  </li>
  pop.init(['blocoExemplo']);
<br> Parâmetros:  
  <li> blocos (Array): Lista dos blocos a serem adicionados.</li>
`,
metodos2:()=>`

<strong>show(blocos)</strong>
<li> Descrição: Atualiza o conteúdo dos blocos existentes no DOM.</li>
<li> Exemplo:  </li>
  pop.show(['blocoExemplo']);
<br> Parâmetros:
  <li> blocos (Array): Lista dos blocos a serem atualizados. Se não passar nenhum bloco, ele atualiza todos.</li>

`,
pop:()=> `<h1>Gostou?</h1>`,
  box:()=> `box`,
math: () => `<h1>cálculo matemático</h1>`,
  $blocoFuncao: () => ['math', () => Math.random() > 0.5 ? 'Sim' : 'Não'] // ['card',funcaoAnonima]
});
pop.init(['header'])

//pop.init(['card'],{text:'<h1>Bem-vindo ao Pop.js!</h1>',data:'bom dia'})
pop.show(['header'])
pop.animar("header", {
  type: "rotate",
  duration: 1000,
  direction: 180
})
pop.animar("header", {
  type: "bounce",
  duration: 500, 
  direction: 1 // O valor 1 representa a intensidade do movimento de quicar
})
pop.animar("header", {
  type: "scale",
  duration: 500,
  direction: 0.7 // O valor 1 representa a intensidade do movimento de quicar
})
pop.animar("header", { type: "fade", duration: 1000 });
setTimeout(() => pop.show(['content']), 3000);
setTimeout(() => pop.show(['metodos1']), 6000);
setTimeout(() => pop.show(['metodos2']), 9000);
pop.animar("header",{
  type:'rotate',
  direction:6,
  delay:1000,
  
})

pop.mover('header',{
  posicaoInicial:{x:3, ax:7,y:10,ay:5, delay:30,maxX:320,maxY:710},

})

pop.evento('header','click', () => pop.init(['pop']))

setTimeout(() => {
  document.querySelector("link[rel='stylesheet']").href = "style.css";
}, 1000); // Muda o CSS após 5 segundos