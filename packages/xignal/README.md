[![version](https://badgen.net/npm/v/xignal)](https://www.npmjs.com/package/xignal)

## Install

`npm i xignal`

## Usage

```ts

import { signal, computed, effect } from "xignal";

const count = signal(1);
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

## License

MIT