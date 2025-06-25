[![version](https://badgen.net/npm/v/@xignal/lit)](https://www.npmjs.com/package/@xignal/lit)

Lit x xignal

## Install

`npm i xignal @xignal/lit`

## Usage

### Basic

```ts

// ./signal.ts

import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

```

#### UseSignalValue

```ts

// ./component-counter.ts

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseSignalValue } from "@xignal/lit";

import { count, doubled } from "./signal";

@customElement("component-counter")
class Counter extends LitElement {
	private countValue = new UseSignalValue(this, count);
	private doubledValue = new UseSignalValue(this, doubled);

	render() {
		return html`
			<div>
				<div>count ${this.countValue.get}</div>
				<div>doubled ${this.doubledValue.get}</div>
			</div>
    `;
	}
}

```

#### Utils

```ts

import { createStateWithUseSignalValue, createComputedWithUseSignalValue } from "@xignal/lit";

const [count, useCount] = createStateWithUseSignalValue(0);
const [doubled, useDoubled] = createComputedWithUseSignalValue(() => count.get() * 2);

```

## License

MIT