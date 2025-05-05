[![version](https://badgen.net/npm/v/@xignal/preact)](https://www.npmjs.com/package/@xignal/preact)

## Install

`npm i xignal @xignal/preact`

## Usage

### Basic

```ts

import { signal, computed } from "xignal";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);

```

```tsx

import { useSignalValue } from "@xignal/preact";

import { count, doubled } from "./signal";

const Counter = () => {
	const countValue = useSignalValue(count);
	const doubledValue = useSignalValue(doubled);
	return (
		<div>
			<div>count {countValue}</div>
			<div>doubled {doubledValue}</div>
		</div>
	);
};

```

### Show

```tsx

import { signal } from "xignal";
import { Show } from "@xignal/preact";

const shouldShow = signal(false);

const App = () => {
	return <Show when={shouldShow}>children</Show>;
};

```

## License

MIT