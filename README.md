# Pop.js

**Pop.js** é uma biblioteca ultra-leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.

> componentes reutilizáveis e zero dependências.
Ideal para quem quer montar interfaces interativas sem frameworks pesados.
Com sintaxe fluida, inicialização automática e suporte a encadeamento, Pop.js é perfeita pra projetos simples que precisam de velocidade e eficiência.

#  Características

- Simplicidade – O código é direto ao ponto e fácil de entender.
- Flexibilidade – Suporta tanto strings quanto elementos do DOM, o que dá mais liberdade para criar componentes dinâmicos.
- Autoinicialização – A classe já carrega os blocos definidos na criação, o que facilita a configuração inicial.
- Encadeamento – O retorno this permite chamadas encadeadas, algo que melhora a fluidez do código.

```markdown
| **Aspecto**              | **Pop.js**                                  | **jQuery**                                   | **React**                                         |
|--------------------------|---------------------------------------------|----------------------------------------------|--------------------------------------------------|
| **Propósito**            | Manipulação DOM moderna e simplificada      | Manipulação DOM imperativa (raiz, 2006)      | Criação de interfaces reativas (SPA/componentes) |
| **Paradigma**            | Declarativo e modular                       | Imperativo                                   | Declarativo, baseado em componentes              |
| **Peso (bundle)**        | Levíssimo (menos de 10KB)                   | Médio (~90KB minificado)                     | Pesado (React + ReactDOM ~120KB+)               |
| **Sintaxe**              | Moderna, próxima de JS vanilla              | Sintaxe própria (ex: `$(...)`)               | JSX, hooks, useEffect, useState, etc.           |
| **Reatividade**          | Parcial (event binding e interação)         | Não reativo por natureza                     | Totalmente reativo                               |
| **Aprendizado**          | Muito fácil (1h já sai usando)              | Muito fácil                                  | Curva média a alta                               |
| **Modularidade**         | Alta (baseada em componentes JS)            | Baixa                                        | Muito alta (componentes + hooks)                |
| **Dependências**         | Zero                                        | Nenhuma, mas é uma dependência por si só     | React + eco (Webpack, Babel, etc)               |
| **Comunidade/Adesão**    | Nascente (experimental/dev indie)           | Gigante, mas em declínio                     | Gigante, dominante no mercado                   |
| **DOM Virtual**          | Não                                          | Não                                          | Sim                                              |
| **SEO-friendly**         | Sim (não depende de virtual DOM ou SPA)     | Sim                                          | Depende do SSR (Next.js, etc)                   |
| **Componentização**      | Sim (JS nativo)                             | Não                                           | Sim (top tier)                                   |
| **Data Binding**         | Manual/simples                              | Manual                                       | Automático via estado                            |
| **Casos de uso ideais**  | Sites leves, dinâmicos e sem build process  | Scripts rápidos, plugins antigos             | SPAs complexas, apps interativos                 |
```

veja um exemplo em:

<a href="https://popjs.netlify.app/">clique aqui para um exemplo</a>

#  Instalação

Usando um arquivo <script>:

Inclua o arquivo pop.js no seu projeto.

```javascript
<script src="https://cdn.jsdelivr.net/gh/DanielFlux23/Pop.js/src/core/pop.js"></script>
```


Ou, se preferir clone o repositório

e adicione isso ao seu html

`<script src="/src/pop.js"></script>`

---

#### 1. constructor(blocos = {}, opens = [])

**Para que serve**  
Inicializa a instância da classe Pop. Pode também já iniciar os blocos definidos.

**Argumentos**  
- `blocos`: Objeto com chaves representando blocos e valores sendo funções que retornam HTML ou elementos.  
- `opens`: Array de blocos a serem inseridos no DOM automaticamente. Se `opens === 'initPop'`, todos os blocos serão iniciados.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
const pop = new Pop({
  header: () => '<h1>Hello</h1>'
}, ['header']);
```

---

### 2. `init(blocos = [], { text = '', data = null, onRender = null, target = null} = {})`

**Para que serve**  
Inicializa e insere no DOM os blocos especificados, se ainda não existirem.

**Argumentos**  
- `blocos`: Array de chaves dos blocos.  
- `text`: (Opcional) Texto fixo para substituir o conteúdo do bloco.  
- `data`: (Opcional) Dados a serem passados para os blocos.
- `onRender` (opcional): Função executada logo após o bloco ser inserido no DOM. Recebe dois argumentos: o elemento inserido e a chave original do bloco.
- `target` (opcional): Elemento ou seletor CSS onde o bloco será inserido. Por padrão, é document.body.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.init(['card'], {
  data: { nome: 'Dani' },
  text: 'Substituir HTML',
  target: '#container',
  onRender: (el, chave) => {
    el.style.border = '2px dashed blue';
  }
});

```

---

### 3. `id(bloco)`

**Para que serve**  
Obtém o conteúdo de um bloco.

**Argumentos**  
- `bloco`: String da chave, ou array `[chave, funcaoExtra]`.

**Retorno**  
Conteúdo HTML ou resultado da função.

**Exemplo**
```javascript
const html = pop.id('header');
```

---

### 4. `show(blocos = [])`

**Para que serve**  
Atualiza o conteúdo dos blocos renderizados. Inicializa se não existir.

**Argumentos**  
- `blocos`: (Opcional) Array com nomes dos blocos. Se omitido, atualiza todos.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.show(['header']);
```

---

### 5.`anime(bloco, config)`

**Para que serve**  
Aplica animações utilizando propriedades customizadas via Web Animations API.

**Argumentos**  
- `bloco`: Seletor ou id do bloco.  
- `config`:  
  - `props`: Array de objetos com os frames da animação.  
  - `duration`: Tempo em ms.  
  - `easing`, `fill`, `onfinish`, etc.

**Retorno**  
Objeto `Animation` ou função encadeável.

**Exemplo**
```javascript
pop.anime('#box', {
  props: [{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }],
  duration: 500
});
```

---

### 6. `mover(selector, config = {})`

**Para que serve**  
Move dinamicamente o elemento, permitindo tanto movimentação baseada em física (aceleração, fricção, limites) quanto animação matemática (usando funções de progresso).

**Argumentos**  
- `selector`: Seletor CSS do elemento a ser animado (ex: `#box`, `.item`).  
- `config`: Objeto de configuração com dois modos possíveis:

---

**Modo Física (simulação contínua)**  
Utiliza aceleração, fricção e limites para simular movimento:

```javascript
{
  physics: {
    ax: 2,        // Aceleração em X
    ay: 1,        // Aceleração em Y
    friction: 0.95, // Fricção (1 = sem perda de aceleração)
    minX: 0, maxX: 300, // Limites em X
    minY: 0, maxY: 500  // Limites em Y
  }
}
```

---

**Modo Animação (baseada em tempo)**  
Define funções baseadas no progresso da animação (`p` varia de 0 a 1):

```javascript
{
  duration: 3000, // Duração em ms
  x: (p) => Math.sin(p * Math.PI * 2) * 100,
  y: (p) => Math.cos(p * Math.PI * 2) * 100
}
```

---

**Retorno**  
Objeto com métodos de controle:

- `pausar()` – Pausa a animação.
- `continuar()` – Retoma a animação.
- `resetar()` – Reseta posição (modo física).

---

**Exemplos**

**1. Modo física:**
```javascript
pop.mover('#box', {
  physics: {
    ax: 2,
    ay: 1,
    friction: 0.96,
    maxX: 300,
    maxY: 200
  }
});
```

**2. Modo animação:**
```javascript
pop.mover('#box', {
  duration: 4000,
  x: (p) => Math.sin(p * Math.PI * 2) * 150,
  y: (p) => Math.cos(p * Math.PI * 2) * 150
});
```

---

### 7. `evento(seletor, tipo, funcao)`

**Para que serve**  
Adiciona ouvintes de eventos em elementos DOM.

**Argumentos**  
- `seletor`: String do seletor CSS.  
- `tipo`: Tipo do evento (ex: `"click"`).  
- `funcao`: Função de callback.

**Exemplo**
```javascript
pop.evento('#btn', 'click', () => alert('Clicado!'));
```

---

### 8. `remover(bloco)`

**Para que serve**  
Remove elementos do DOM por id.

**Argumentos**  
- `bloco`: String ou array com ids.

**Exemplo**
```javascript
pop.remover('box');
```

---

### 9. `add(nome, callback)`

**Para que serve**  
Adiciona dinamicamente um novo bloco.

**Argumentos**  
- `nome`: Nome da chave do bloco.  
- `callback`: Função que retorna HTML ou elemento.

**Retorno**  
Instância da classe `Pop`.

---

### 10. `setVar(nomeVariavel, callback)`

**Para que serve**  
Cria uma variável observável. Executa um callback sempre que seu valor mudar.

**Argumentos**  
- `nomeVariavel`: Nome da variável dentro de `pop.set`.  
- `callback`: Função a ser chamada no `set`.

**Exemplo**
```javascript
pop.setVar('contador', () => console.log('Mudou!'));
pop.set.contador = 42;
```

---

### 11. `clone(blocoOriginal, nomeDoClone)`

**Para que serve**  
Cria uma cópia de um bloco existente.

**Argumentos**  
- `blocoOriginal`: Nome do bloco base.  
- `nomeDoClone`: (Opcional) Nome para o clone.

**Exemplo**
```javascript
pop.clone('card', 'cardNovo');
```

---

### 12. `$(seletor) & $$(id)`

**Para que serve**  
Atalhos para `document.querySelector` e `getElementById`.

**Exemplo**
```javascript
pop.$('#minhaDiv').innerHTML = 'Oi!';
```

---

### 13. `style(bloco)`

**Para que serve**  
Retorna o objeto `style` de um bloco.

**Exemplo**
```javascript
pop.style('box').backgroundColor = 'red';
```

### `grupe(nome, blocos)`

**Para que serve**  
Cria grupos de blocos que podem ser reutilizados juntos.

**Argumentos**  
- `nome`: Nome do grupo.  
- `blocos`: Array de nomes de blocos a serem agrupados.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.grupe('layout', ['header', 'main', 'footer']);
```

---

### 14. `absoluteExiber(blocos)`

**Para que serve**  
Remove do DOM todos os blocos que **não** estão no array especificado.

**Argumentos**  
- `blocos`: Array com nomes de blocos válidos.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.absoluteExiber(['main']);
```

---

### 15. `setShow(nomeVariavel, blocos)`

**Para que serve**  
Exibe blocos automaticamente sempre que a variável observável associada muda de valor.

**Argumentos**  
- `nomeVariavel`: Nome da variável criada via `setVar`.  
- `blocos`: Array com nomes dos blocos a serem exibidos.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.setShow('visivel', ['modal']);
```

---

### 16. `html(bloco, html)`

**Para que serve**  
Define manualmente o HTML interno de um bloco.

**Argumentos**  
- `bloco`: ID do bloco.  
- `html`: String com conteúdo HTML.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.html('header', '<h1>Novo título</h1>');
```

---

### 17. `css(css)`

**Para que serve**  
Insere regras CSS diretamente no documento.

**Argumentos**  
- `css`: String contendo código CSS.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.css('body { background: #000; color: #fff; }');
```

---


## Blocos com `$` e `&`

- **Chave com `$`**: Interpreta o valor retornado como uma referência a outro bloco.  
  Exemplo:
  ```javascript
  card: () => 'Oi!',
  $ref: () => 'card'
  ```

- **Chave com `&`**: Indica que o bloco será clonado automaticamente.  
  ```javascript
  pop.init(['card&']); // gera 'card1', 'card2'...
  ```

---

## Composição com Funções

Blocos podem ser arrays com `[chave, funcaoExtra]` para conteúdo dinâmico:
```javascript
['math', () => Math.random() > 0.5 ? 'Sim' : 'Não']
```
Retorna:
```
Conteúdo de math + 'Sim' ou 'Não'
```

---

## Exemplo Completo
```html
<script src="pop.js"></script>
<script>
const pop = new Pop({
  header: () => '<h1>Pop.js</h1>',
  content: () => '<p>Conteúdo inicial</p>',
  $referencia: () => 'header'
}, ['header']);

setTimeout(() => pop.show(['content']), 2000);
</script>
``` 
## 🧑‍💻 Contribuição

Se você quiser contribuir com o Pop.js, faça um fork deste repositório, faça suas alterações e envie um pull request. Fique à vontade para sugerir melhorias, novos métodos ou até funcionalidades incríveis que você acha que o Pop.js deveria ter!

## 📄 Licença

Este projeto é licenciado sob a MIT License – veja o arquivo LICENSE para mais detalhes.


---

> “Criado por pura preguiça de aprender React. E funcionou.”

## 🍿 Por que "Pop"?

O nome "Pop" reflete algo leve, dinâmico e rápido, assim como a biblioteca. É uma forma simples e rápida de gerenciar blocos de conteúdo no seu site.

---

Boa sorte com o Pop! 😎
