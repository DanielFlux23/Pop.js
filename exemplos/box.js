const pop = new Pop({
  box: () => ``,
})

pop.init(['box'])

pop.style('box').background = 'green';

pop.mover('box', {
  //posicaoInicial:{x:3, ax:7,y:10,ay:5, delay:30,maxX:320,maxY:710},
  gravidade: { y: 0, ay: 2, delay: 30, },
  vento: { x: 0, ax: 2, delay: 30, maxX: 200 },
  
});


  const box = document.getElementById('box');

  const keyframes = [
  { left: '200px', top: '150px', width: '100px', height: '100px', opacity: 1, borderRadius: '0%', offset: 0 },
  { width: '200px', height: '200px', offset: 0.3 },
  { opacity: 0.3, borderRadius: '50%', offset: 0.5 },
  { top: '300px', left: '50px', offset: 0.7 },
  { opacity: 1, borderRadius: '0%', width: '100px', height: '100px', offset: 1 }
];

  const timing = {
    duration: 3500,
    iterations: 1,
    fill: 'forwards',
    easing: 'ease-in-out'
  };

  box.animate(keyframes, timing).onfinish = () => {
    console.log("Tudo feito, chefia!");
  };

/*
gravidade:{x:0,y:0,ax:3,ay:5,delay:50}
*/
/*pop.pausar();
setTimeout(() => pop.continuar(), 2000);*/