# xignal

signals library

## Packages

- [xignal](./packages/xignal)
- [@xignal/lit](./packages/xignal-lit)
- [@xignal/preact](./packages/xignal-preact)
- [@xignal/react](./packages/xignal-react)
- [@xignal/solid](./packages/xignal-solid)
- [@xignal/svelte](./packages/xignal-svelte)
- [@xignal/vue](./packages/xignal-vue)

## Install

`npm i xignal`

## Usage

```ts

import { state, computed, effect } from "xignal";

const count = state(1);
const doubled = computed(() => count.get() * 2);

effect(() => {
	console.log(`doubled ${doubled.get()}`); // "doubled 2"
});

count.get(); // 1
doubled.get(); // 2

count.set(2); // "doubled 4"

count.get(); // 2
doubled.get(); // 4

```

## Acknowledgements

### [alien-signals](https://github.com/stackblitz/alien-signals)

### [nanostores](https://github.com/nanostores/nanostores)

## License

MIT