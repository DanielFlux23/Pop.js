# Pop.js

**Pop.js** é uma biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.

> “Criado por pura preguiça de aprender React. E funcionou.”


#  Características

- Simplicidade – O código é direto ao ponto e fácil de entender.
- Flexibilidade – Suporta tanto strings quanto elementos do DOM, o que dá mais liberdade para criar componentes dinâmicos.
- Autoinicialização – A classe já carrega os blocos definidos na criação, o que facilita a configuração inicial.
- Encadeamento – O retorno this permite chamadas encadeadas, algo que melhora a fluidez do código.

#  Instalação

Usando um arquivo <script>:

Inclua o arquivo pop.js no seu projeto.

`<script src="https://cdn.jsdelivr.net/gh/DanielFlux23/Pop.js/src/pop.js"></script>`

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

### 2. init(blocos = [], { text = '', data = null, onRender = null, target = null} = {})

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

### 3. id(bloco)

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

### 4. show(blocos = [])

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

### 5. animar(bloco, config)

**Para que serve**  
Aplica animações encadeadas no bloco especificado.

**Argumentos**  
- `bloco`: Id do bloco.  
- `config`: Objeto com opções de animação:
```javascript
{
  type: 'slide',      // 'rotate' | 'fade' | 'slide' | 'bounce' | 'scale'
  duration: 500,
  easing: 'ease-in-out',
  delay: 0,
  direction: 'up'     // depende do tipo
}
```

**Retorno**  
Nenhum.

**Exemplo**
```javascript
pop.animar('box', { type: 'rotate', direction: 90 });
```

---

### 6. mover(bloco, config = {})

**Para que serve**  
Move dinamicamente o elemento com base em física simples.

**Argumentos**  
- `bloco`: Id do bloco.  
- `config`: Objeto com múltiplos vetores de força:
```javascript
{
  vento: { ax: 2, delay: 30, maxX: 300 },
  gravidade: { ay: 1, delay: 30 }
}
```

**Retorno**  
Nenhum diretamente. Adiciona `pop.pausar()` e `pop.continuar()`.

**Exemplo**
```javascript
pop.mover('box', {
  vento: { ax: 2, delay: 30, maxX: 300 },
  gravidade: { ay: 1, delay: 30 }
});
```

---

### 7. evento(seletor, tipo, funcao)

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

### 8. remover(bloco)

**Para que serve**  
Remove elementos do DOM por id.

**Argumentos**  
- `bloco`: String ou array com ids.

**Exemplo**
```javascript
pop.remover('box');
```

---

### 9. add(nome, callback)

**Para que serve**  
Adiciona dinamicamente um novo bloco.

**Argumentos**  
- `nome`: Nome da chave do bloco.  
- `callback`: Função que retorna HTML ou elemento.

**Retorno**  
Instância da classe `Pop`.

---

### 10. setVar(nomeVariavel, callback)

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

### 11. clone(blocoOriginal, nomeDoClone)

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

### 12. $(seletor) & $$(id)

**Para que serve**  
Atalhos para `document.querySelector` e `getElementById`.

**Exemplo**
```javascript
pop.$('#minhaDiv').innerHTML = 'Oi!';
```

---

### 13. style(bloco)

**Para que serve**  
Retorna o objeto `style` de um bloco.

**Exemplo**
```javascript
pop.style('box').backgroundColor = 'red';
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


## 🍿 Por que "Pop"?

O nome "Pop" reflete algo leve, dinâmico e rápido, assim como a biblioteca. É uma forma simples e rápida de gerenciar blocos de conteúdo no seu site.

---

Boa sorte com o Pop! 😎
