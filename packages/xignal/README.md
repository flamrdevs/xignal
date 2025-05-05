[![version](https://badgen.net/npm/v/xignal)](https://www.npmjs.com/package/xignal)

## Install

`npm i xignal`

## Usage

### Basic

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

### Update

```ts

import { signal, update } from "xignal";

const n = signal(0);

update(n, 1); // n = 1
update(n, (n) => n + 1); // n = 2

```

### Batch

```ts

import { signal, batch } from "xignal";

const n1 = signal(0);
const n2 = signal(0);

batch(() => {
	n1.set(1);
	n2.set(-1);
});

```

### Untrack

```ts

import { signal, effect, untrack } from "xignal";

const n1 = signal(0);
const n2 = signal(0);

effect(() => {
	n1.get();
	const n2Value = untrack(() => n2.get());
});

```

### Storage

```ts

import { signal, createMemoryDriver, createStorageDriver } from "xignal/storage";

const localStorageSignal = signal("localStorage", "value");

const sessionStorageSignal = signal("sessionStorage", "value", createStorageDriver(sessionStorage));

const memoryStorageDriver = createMemoryDriver({});
const memoryStorageSignalX = signal("x", 0, memoryStorageDriver);
const memoryStorageSignalY = signal("y", 0, memoryStorageDriver);

```

## License

MIT