const pop = new Pop({
  box: () => ``,
})

pop.init(['box'])

pop.style('box').background = 'green';

pop.mover('box', {
  //posicaoInicial:{x:3, ax:7,y:10,ay:5, delay:30,maxX:320,maxY:710},
  gravidade: { y: 0, ay: 2, delay: 30, },
  vento: { x: 0, ax: 2, delay: 30, maxX: 320 },
  
});
/*
gravidade:{x:0,y:0,ax:3,ay:5,delay:50}
*/
/*pop.pausar();
setTimeout(() => pop.continuar(), 2000);*/