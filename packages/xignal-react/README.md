[![version](https://badgen.net/npm/v/@xignal/react)](https://www.npmjs.com/package/@xignal/react)

## Install

`npm i xignal @xignal/react`

## Usage

```ts

import { signal, computed } from "xignal";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);

```

```tsx

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

## License

MIT