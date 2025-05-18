[![version](https://badgen.net/npm/v/xignal)](https://www.npmjs.com/package/xignal)

signals library

## Install

`npm i xignal`

## Usage

### Basic

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

#### another way to import

```ts

import * as xignal from "xignal";

const count = xignal.state(1);
const doubled = xignal.computed(() => count.get() * 2);

xignal.effect(() => {
	console.log(`doubled ${doubled.get()}`);
});

```

### Update

```ts

import { state, update } from "xignal";

const n = state(0);

update(n, 1); // n = 1
update(n, (n) => n + 1); // n = 2

```

### Batch

```ts

import { state, batch } from "xignal";

const n1 = state(0);
const n2 = state(0);

batch(() => {
	n1.set(1);
	n2.set(-1);
});

```

### Untrack

```ts

import { state, effect, untrack } from "xignal";

const n1 = state(0);
const n2 = state(0);

effect(() => {
	n1.get();
	const n2Value = untrack(() => n2.get());
});

```

### Storage

```ts

import { state, createMemoryDriver, createStorageDriver } from "xignal/storage";

const localStorageSignal = state("localStorage", "value");

const sessionStorageSignal = state("sessionStorage", "value", createStorageDriver(sessionStorage));

const memoryStorageDriver = createMemoryDriver({});
const memoryStorageSignalX = state("x", 0, memoryStorageDriver);
const memoryStorageSignalY = state("y", 0, memoryStorageDriver);

```

### Standard Schema

```ts

import { state, computed } from "xignal/standard-schema";
// import { state } from "xignal/standard-schema/storage";

import { z } from "zod";

const count = state(z.number(), 1);
const doubled = computed(z.number(), () => count.get() * 2);

```

## License

MIT