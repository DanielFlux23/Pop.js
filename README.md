# Pop.js

**Pop.js** é uma biblioteca leve e flexível para manipulação dinâmica do DOM, permitindo adicionar e atualizar blocos HTML de maneira simples e sem complicação.

> “Criado por pura preguiça de aprender React. E funcionou.”

## 📜 Índice

1. [Características](#-características)
2. [Instalação](#-instalação)
3. [Uso](#-uso)
4. [Contribuição](#-contribuição)
5. [Licença](#-licença)

---
# 🔥 Características
 Pontos Fortes

- ✅ Simplicidade – O código é direto ao ponto e fácil de entender.
- ✅ Flexibilidade – Suporta tanto strings quanto elementos do DOM, o que dá mais liberdade para criar componentes dinâmicos.
- ✅ Autoinicialização – A classe já carrega os blocos definidos na criação, o que facilita a configuração inicial.
- ✅ Encadeamento – O retorno this permite chamadas encadeadas, algo que melhora a fluidez do código.

# 🛠 Instalação

Usando um arquivo <script>:

Inclua o arquivo pop.js no seu projeto.

`<script src="pop.js"></script>`

Ou, se preferir, use um módulo ES6:

`import Pop from './pop.js';`

## 🚀 Uso


```javascript
// Definindo os blocos de conteúdo com funções que geram conteúdo dinâmico.
const pop = new Pop({
  bloco1: () => '<h1>Conteúdo do Bloco 1</h1>',
  bloco2: () => '<p>Conteúdo do Bloco 2</p>',
  $blocoEspecial: () => 'bloco2' // clonar o bloco2
});


// Inicializando e mostrando os blocos no DOM.
pop.init(['bloco1', 'bloco2']);

// Atualizando um bloco específico no DOM.
pop.show(['bloco1']);

// Recuperando o conteúdo de um bloco específico.
const conteudoBloco1 = pop.id('bloco1');
console.log(conteudoBloco1); // 'Conteúdo do Bloco 1'
```
### Métodos

`constructor(blocos = {}, opens = [])`

O construtor da classe recebe dois parâmetros:

**blocos** (opcional): Um objeto que mapeia chaves para funções que retornam o conteúdo do bloco. Exemplo:
```javascript
{
  'bloco1': () => 'Conteúdo do Bloco 1',
  'bloco2': () => 'Conteúdo do Bloco 2'
}
```
**opens** (opcional): Um array de chaves de blocos a serem inicializados no DOM. Se não for fornecido, será nenhum bloco será inicializado. Caso seja passado como 'initPop', todos os blocos serão automaticamente inicializados.


#### Exemplo:

`const pop = new Pop(blocos, ['bloco1']);`

#### 2. init(blocos = [], { text = '', data=null} = {})

Este método inicializa e insere os blocos especificados no DOM. Caso o bloco ainda não tenha sido inserido, ele será criado.

**blocos**: Um array com as chaves dos blocos a serem inicializados.

**text** (opcional): Texto que pode ser usado para o conteúdo do bloco, caso você precise de uma forma rápida de atualizar o texto de um bloco sem precisa de uma variável 

**data** : permite enviar dados para os blocos

#### Exemplo:

`pop.init(['bloco1'], {text = 'meu texto', dado=[1,3]]);`

#### 3. id(bloco)

Este método permite acessar o conteúdo de um bloco específico.

Se bloco for uma chave simples (string), o método retorna o conteúdo gerado pela função associada.

Se bloco for um array[chave, funcao], o método id tenta combinar o conteúdo da chaves com o que a função gerar, retornando o resultado concatenado.


#### Exemplo:

```javascript
const conteudo = pop.id('bloco1');
console.log(conteudo); // 'Conteúdo do Bloco 1
```

4. show(blocos = [])

O método show atualiza o conteúdo dos blocos existentes no DOM. Se um bloco não existir, ele será inicializado.

blocos: Um array com as chaves dos blocos que precisam ser atualizados. Se não for fornecido, todos os blocos definidos inicialmente serão atualizados.


#### Exemplo:

`pop.show(['bloco1']); // Atualiza o bloco1 no DOM`

5. animar

O método animar é capaz de criar animação simples de forma rápida 

bloco: o bloco em que se pretende animar

config: configurações da animação
```javascript
/*
{
  type: "rotate", // Tipo de animação (rotate, scale, fade, slide, bounce)
  duration: 500, // Duração da animação (em ms)
  easing: "ease-in-out", // Função de timing (opcional)
  repeat: true, // Repetir a animação (opcional)
  delay: 0, // Atraso antes de começar a animação (em ms, opcional)
  direction: 40, // Valor específico da animação (pode ser -34, 1.2, etc, dependendo do tipo)
}*/
```

6. mover(bloco, config={})

O método mover é capaz de mover um elemento de forma razoavelmente complexa

bloco: o bloco em que se pretende mover

config: configurações da movimentação

#### exemplo

```javascript
pop.mover('box', {
gravidade: { y: 0, ay: 2, delay: 30, },
vento: { x: 0, ax: 2, delay: 30, maxX:320},

});
```

7. evento(seletor, typeEvento, funcao)

seletor: elemento que receberam o evento

typeEvento: tipo do eventoeve(ex:click)

funcao: função Callback, que será executada quando o evento acionar

#### exemplo

```javascript
pop.evento('#butao','click',() => {console.log('hello Word')})
```

8. remover(bloco)

O método remover, retirar um elemento do DOM

bloco: elementoe que se pretende remover


Detalhamento do Funcionamento

Criação de Elementos no DOM

Quando um bloco é inicializado, o método init cria um div com o id correspondente à chave do bloco. O conteúdo do bloco é inserido como o conteúdo HTML do elemento.

Se o conteúdo do bloco for um elemento HTML, ele será adicionado diretamente.

Caso contrário, o conteúdo será tratado como uma string e inserido diretamente no innerHTML(ou processada em casos especiais ).


### Blocos com Chaves Especiais ($)

Blocos com o símbolo $ não são tratados como HTML. Em vez disso, o conteúdo dessas chaves é um referenciador ou cronador. Ou seja, o bloco referenciado será usado para referenciar o conteúdo de outro bloco, como uma espécie de "atalho" ou função.

Exemplo:

Se tivermos o bloco:

```javascript
card:() => `bom dia`,
$blocoReferenciado: () => 'card'
```
Ao inicializar $blocoReferenciado, o conteúdo será o do bloco associada a ele.

Se a chave começar com $, a classe irá buscar a função associada à chave e usá-la como uma referência para gerar o conteúdo ou cronar um outro bloco.

Caso 1: Bloco especial com função
```javascript
math:() => `<h1>cálculo matemático</h1>`,
$blocoFuncao: () => ['math', ()=> Math.random() > 0.5 ? 'Sim' : 'Não'] // ['card',funcaoAnonima]
```
`// <h1>cálculo matemático</h1>Sim`
Isso fará com que cada vez que o bloco seja acessado, ele execute a função que retorna um valor dinâmico. e depois concatena com o bloco referenciado

Manipulação de Conteúdo Dinâmico

Se o conteúdo de um bloco for alterado, o método show irá atualizar o bloco no DOM com o novo conteúdo. Caso o bloco ainda não tenha sido inserido, ele será inicializado automaticamente.

Exemplo
```javascript
<script src="pop.js"></script>
<script>
  const pop = new Pop({
    header: () => '<h1>Bem-vindo ao Pop.js!</h1>',
    content: () => '<p>Isso é um exemplo de uso.</p>',
  }, ['header']);

  // Atualizar o conteúdo depois de 3 segundos
  setTimeout(() => pop.show(['content']), 3000);
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
