[![version](https://badgen.net/npm/v/@xignal/react)](https://www.npmjs.com/package/@xignal/react)

React x xignal

## Install

`npm i xignal @xignal/react`

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

import { useSignalValue } from "@xignal/react";

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
import { Show } from "@xignal/react";

const shouldShow = xignal.state(false);

const App = () => {
	return <Show when={shouldShow}>children</Show>;
};

```

#### Utils

```ts

import { createStateWithUseSignalValue, createComputedWithUseSignalValue } from "@xignal/react";

const [count, useCount] = createStateWithUseSignalValue(0);
const [doubled, useDoubled] = createComputedWithUseSignalValue(() => count.get() * 2);

```

## License

MIT