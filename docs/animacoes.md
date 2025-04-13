### anime(bloco, config)

**Para que serve**  
Aplica animações a um bloco especificado, com suporte para uma API fluente para adição de animações e configuração dos parâmetros de tempo, ou utilizando um modo declarativo direto.

**Argumentos**  
- `bloco` (string): Seletor CSS do bloco (elemento DOM) que será animado.
- `config` (objeto opcional): Objeto de configuração que define as propriedades da animação.
  - `props`: Array ou objeto contendo as keyframes da animação.
  - `duration`: Duração da animação em milissegundos (padrão é 1000).
  - `easing`: Função de easing da animação (padrão é `'linear'`).
  - `fill`: Preenchimento da animação (padrão é `'forwards'`).
  - `onfinish`: Função de callback chamada quando a animação terminar.

**Comportamento**
O método tem dois modos de operação:

1. **Modo fluente**  
   Quando não é passado o argumento `config`, o método retorna uma série de funções encadeáveis que permitem adicionar animações e configurar suas propriedades. As funções disponíveis são:
   - `add(props)`: Adiciona uma animação ao conjunto de animações. A propriedade `props` deve ser um array ou objeto contendo as keyframes da animação.
   - `config(configs)`: Configura os parâmetros de tempo da animação (como duração, easing e fill). Depois de configurar, chama `play()` automaticamente.
   - `play()`: Inicia a animação com os parâmetros e keyframes definidos. Se nenhuma animação foi adicionada, um aviso será mostrado.
   - `onfinish`: Função de callback chamada quando a animação termina.

2. **Modo declarativo**  
   Quando `config` é passado como um objeto, ele é utilizado diretamente para definir os parâmetros da animação. A animação é então iniciada imediatamente. Se a propriedade `props` não for fornecida ou estiver vazia, um aviso será exibido.

**Retorno**  
- No **modo fluente**, retorna a instância do animador para permitir encadeamento de chamadas.
- No **modo declarativo**, retorna o `player` da animação (`Animation`), que é um objeto com controle sobre a animação.

**Exemplo de uso - Modo fluente**
```javascript
pop.anime('#box')
  .add([{ transform: 'scale(0.5)' }, { transform: 'scale(1)' }])
  .config({ duration: 500, easing: 'ease-out' })
  .play();
```

**Exemplo de uso - Modo declarativo**
```javascript
pop.anime('#box', {
  props: [{ transform: 'scale(0.5)' }, { transform: 'scale(1)' }],
  duration: 500,
  easing: 'ease-out',
  onfinish: () => console.log('Animação finalizada!')
});
```

**Notas**  
- Se o bloco não for encontrado no DOM, um erro será exibido no console.
- No **modo fluente**, é possível encadear as funções `add`, `config` e `play`.
- Se nenhuma animação for definida no **modo fluente**, o método exibirá um aviso de que nenhuma animação foi adicionada.