export function createReactive(obj) {
  const deps = new Map();
  
  const track = (prop) => {
    if (!currentEffect) return;
    if (!deps.has(prop)) deps.set(prop, new Set());
    deps.get(prop).add(currentEffect);
  };
  
  const trigger = (prop) => {
    if (deps.has(prop)) {
      for (const effect of deps.get(prop)) {
        effect();
      }
    }
  };
  
  let currentEffect = null;
  
  const reactive = new Proxy(obj, {
    get(target, prop, receiver) {
      track(prop);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);
      trigger(prop);
      return result;
    }
  });
  
  function watch(fn) {
    currentEffect = fn;
    fn(); // Executa a primeira vez
    currentEffect = null;
  }
  
  return { reactive, watch };
}

const { reactive, watch } = createReactive({ count: 0 });

watch(() => {
  document.querySelector("#count").textContent = reactive.count;
});

document.querySelector("#btn").addEventListener("click", () => {
  reactive.count++;
});

export function signal(initial) {
  let value = initial;
  const subscribers = new Set();
  
  const get = () => {
    if (currentEffect) subscribers.add(currentEffect);
    return value;
  };
  
  const set = (newValue) => {
    value = newValue;
    subscribers.forEach(fn => fn());
  };
  
  return [get, set];
}

export function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

const [count, setCount] = signal(0);

effect(() => {
  document.querySelector("#count").textContent = count();
});

document.querySelector("#btn").onclick = () => setCount(count() + 1);

pop.autoBind("#count", () => count()); // Atualiza automaticamente