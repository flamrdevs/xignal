[![version](https://badgen.net/npm/v/@xignal/preact)](https://www.npmjs.com/package/@xignal/preact)

Preact x xignal

## Install

`npm i xignal @xignal/preact`

## Usage

### Basic

```ts

import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

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

import * as xignal from "xignal";
import { Show } from "@xignal/preact";

const shouldShow = xignal.state(false);

const App = () => {
	return <Show when={shouldShow}>children</Show>;
};

```

## License

MIT