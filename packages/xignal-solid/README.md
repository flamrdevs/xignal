[![version](https://badgen.net/npm/v/@xignal/solid)](https://www.npmjs.com/package/@xignal/solid)

Solid x xignal

## Install

`npm i xignal @xignal/solid`

## Usage

### Basic

```ts

// ./signal.ts

import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

```

#### useSignalValue

```tsx

// ./counter.tsx

import { useSignalValue } from "@xignal/solid";

import { count, doubled } from "./signal";

const Counter = () => {
	const countValue = useSignalValue(count);
	const doubledValue = useSignalValue(doubled);
	return (
		<div>
			<div>count {countValue()}</div>
			<div>doubled {doubledValue()}</div>
		</div>
	);
};

```

#### useSignalState

```tsx
import { useSignalState } from "@xignal/solid";

import { count } from "./signal";

const Component = () => {
	const [countValue, countUpdate] = useSignalState(count);
};
```

#### useSignalComputed

```tsx
import { useSignalComputed } from "@xignal/solid";

import { count } from "./signal";

const Component = () => {
	const doubledValue = useSignalComputed(() => count.get() * 2);
};
```

### Show

```tsx

import * as xignal from "xignal";
import { Show } from "@xignal/solid";

const shouldShow = xignal.state(false);

const App = () => {
	return <Show when={shouldShow}>children</Show>;
};

```

#### Utils

```ts

import { createStateWithUseSignalValue, createComputedWithUseSignalValue } from "@xignal/solid";

const [count, useCount] = createStateWithUseSignalValue(0);
const [doubled, useDoubled] = createComputedWithUseSignalValue(() => count.get() * 2);

```

## License

MIT