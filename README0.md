# Pop.js

**Pop.js** é uma biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.

> “Criado por pura preguiça de aprender React. E funcionou.”


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
<script src="https://cdn.jsdelivr.net/gh/DanielFlux23/Pop.js/src/pop.js"></script>
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

### 1. init(blocos, options)

**Para que serve**  
Inicializa e insere no DOM os blocos especificados, criando elementos `div` com o conteúdo gerado pelas funções registradas.

**Argumentos**  
- `blocos`: Array de strings com os nomes dos blocos.
- `options`: Objeto opcional:
  - `text`: HTML fixo a ser usado.
  - `data`: Dados para passar à função do bloco.
  - `force`: Se true, força reinserção.
  - `target`: Elemento DOM onde inserir.
  - `onRender`: Callback ao renderizar o bloco.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.init(['header', 'main'], { data: { user: 'Ana' } });
```

---

### 2. add(nomeOuObj, callback)

**Para que serve**  
Adiciona novos blocos ao sistema.

**Argumentos**  
- `nomeOuObj`: Nome do bloco (string) ou objeto com múltiplos blocos.
- `callback`: Função que retorna HTML ou HTMLElement.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.add('menu', () => '<nav>Menu</nav>');
```

---

### 3. grupe(nome, blocos)

**Para que serve**  
Cria grupos de blocos que podem ser reutilizados.

**Argumentos**  
- `nome`: Nome do grupo.
- `blocos`: Array de nomes de blocos.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.grupe('layout', ['header', 'main', 'footer']);
```

---

### 4. absoluteExiber(blocos)

**Para que serve**  
Remove blocos não definidos no array.

**Argumentos**  
- `blocos`: Array com nomes de blocos válidos.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.absoluteExiber(['main']);
```

---

### 5. setVar(nomeVariavel, callback)

**Para que serve**  
Cria uma variável observável com reação personalizada.

**Argumentos**  
- `nomeVariavel`: Nome da variável.
- `callback`: Função chamada ao alterar o valor.

**Retorno**  
Objeto `set` da instância.

**Exemplo**
```javascript
pop.setVar('contador', () => console.log('Atualizado!'));
```

---

### 6. setShow(nomeVariavel, blocos)

**Para que serve**  
Configura uma variável que, ao mudar, mostra blocos.

**Argumentos**  
- `nomeVariavel`: Nome da variável.
- `blocos`: Blocos que devem ser exibidos.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.setShow('visivel', ['modal']);
```

---

### 7. clone(blocoParaClona, nomeDoBloco)

**Para que serve**  
Clona um bloco com novo nome e o renderiza.

**Argumentos**  
- `blocoParaClona`: Nome do bloco base.
- `nomeDoBloco`: Novo nome do bloco (opcional).

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.clone('box', 'boxClonado');
```

---

### 8. anime(bloco, config)

**Para que serve**  
Aplica animações a um bloco.

**Argumentos**  
- `bloco`: Seletor do bloco.
- `config`: Objeto com `props`, `duration`, `easing`, `fill`, `onfinish`.

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

### 9. html(bloco, html)

**Para que serve**  
Define o HTML interno de um bloco.

**Argumentos**  
- `bloco`: ID do bloco.
- `html`: HTML como string.

**Retorno**  
Instância da classe `Pop`.

**Exemplo**
```javascript
pop.html('header', '<h1>Novo título</h1>');
```

---

### 10. css(css)

**Para que serve**  
Insere CSS no documento.

**Argumentos**  
- `css`: Código CSS como string.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.css('body { background: #000; }');
```

---

### 11. mover(bloco, config)

**Para que serve**  
Aplica movimento contínuo com aceleração, limites e fricção.

**Argumentos**  
- `bloco`: ID do bloco.
- `config`: Objeto com configurações físicas (`ax`, `ay`, `minX`, etc).

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.mover('box', {
  loop: { ax: 1, delay: 16, friccao: 0.9 }
});
```

---

### 12. style(bloco)

**Para que serve**  
Acessa diretamente o estilo do bloco.

**Argumentos**  
- `bloco`: ID do bloco.

**Retorno**  
Objeto `style` do DOM.

**Exemplo**
```javascript
pop.style('box').backgroundColor = 'red';
```

---

### 13. evento(seletor, typeEvento, funcao)

**Para que serve**  
Adiciona um ouvinte de evento a elementos.

**Argumentos**  
- `seletor`: CSS selector.
- `typeEvento`: Tipo de evento (e.g. 'click').
- `funcao`: Função callback.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.evento('.botao', 'click', () => alert('Clicado!'));
```

---

### 14. id(bloco)

**Para que serve**  
Obtém o conteúdo HTML ou executa função de um bloco.

**Argumentos**  
- `bloco`: String com o nome do bloco ou array `[nome, funcaoExtra]`.

**Retorno**  
HTML do bloco.

**Exemplo**
```javascript
const conteudo = pop.id('footer');
```

---

### 15. remover(bloco, debug)

**Para que serve**  
Remove elementos do DOM pelo ID.

**Argumentos**  
- `bloco`: String ou array de strings com os IDs.
- `debug`: Booleano para exibir erros se não encontrados.

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.remover(['menu', 'header'], true);
```

---

### 16. show(blocos)

**Para que serve**  
Atualiza ou insere blocos no DOM.

**Argumentos**  
- `blocos`: Array de blocos a serem atualizados.

**Retorno**  
Array com os nomes dos blocos renderizados.

**Exemplo**
```javascript
pop.show(['main']);
```

---

### 17. $(elemento)

**Para que serve**  
Seleciona um elemento com `querySelector`.

**Argumentos**  
- `elemento`: Seletor CSS.

**Retorno**  
Elemento DOM.

**Exemplo**
```javascript
const el = pop.$('.titulo');
```

---

### 18. $$(elemento)

**Para que serve**  
Seleciona um elemento por `id`.

**Argumentos**  
- `elemento`: ID do elemento.

**Retorno**  
Elemento DOM.

**Exemplo**
```javascript
const el = pop.$$('box');
```
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


## 🍿 Por que "Pop"?

O nome "Pop" reflete algo leve, dinâmico e rápido, assim como a biblioteca. É uma forma simples e rápida de gerenciar blocos de conteúdo no seu site.

---

Boa sorte com o Pop! 😎
