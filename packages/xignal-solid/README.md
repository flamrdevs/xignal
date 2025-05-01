[![version](https://badgen.net/npm/v/@xignal/solid)](https://www.npmjs.com/package/@xignal/solid)

## Install

`npm i xignal @xignal/solid`

## Usage

```ts

import { signal, computed } from "xignal";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);

```

```tsx

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

## License

MIT