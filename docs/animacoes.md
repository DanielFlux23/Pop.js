# Exemplos de Animações com a Classe `Animador`

Abaixo estão alguns exemplos de uso da classe `Animador`, variando de simples a complexas, usando uma interface intuitiva.

---

## 1. Fade In clássico
```js
animador.animar("elemento", { type: "fade", duration: 500 });
```

---

## 2. Rotação dramática
```js
animador.animar("elemento", { type: "rotate", direction: 720, duration: 1000 });
```

---

## 3. Zoom In estilo apresentação
```js
animador.animar("elemento", { type: "scale", direction: 1.8, duration: 600 });
```

---

## 4. Slide In da esquerda com suavidade
```js
animador.animar("elemento", { type: "slide", direction: "left", duration: 700, easing: "ease-out" });
```

---

## 5. Bounce (pulo leve)
```js
animador.animar("elemento", { type: "bounce", direction: 2, duration: 800 });
```

---

## 6. Slide + Fade In (dupla transição)
```js
animador.animar("elemento", { 
  keyframes: [
    { transform: "translateY(50%)", opacity: 0 },
    { transform: "translateY(0)", opacity: 1 }
  ],
  options: { duration: 600, easing: "ease-out" }
});
```

---

## 7. Flip tipo carta de baralho
```js
animador.animar("elemento", {
  keyframes: [
    { transform: "rotateY(0deg)", opacity: 0.5 },
    { transform: "rotateY(180deg)", opacity: 1 }
  ],
  options: { duration: 1000, easing: "ease-in-out" }
});
```

---

## 8. Pulso infinito (looping)
```js
animador.animar("elemento", {
  keyframes: [
    { transform: "scale(1)" },
    { transform: "scale(1.1)" },
    { transform: "scale(1)" }
  ],
  options: { duration: 800, iterations: Infinity }
});
```

---

## 9. Brilho tipo neon piscante
```js
animador.animar("elemento", {
  keyframes: [
    { filter: "brightness(1)" },
    { filter: "brightness(2)" },
    { filter: "brightness(1)" }
  ],
  options: { duration: 600, iterations: Infinity }
});
```

---

## 10. Entrada épica com zoom, fade e rotação
```js
animador.animar("elemento", {
  keyframes: [
    { transform: "scale(0) rotate(-360deg)", opacity: 0 },
    { transform: "scale(1) rotate(0deg)", opacity: 1 }
  ],
  options: { duration: 1000, easing: "ease-out" }
});
```

---