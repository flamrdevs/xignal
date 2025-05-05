[![version](https://badgen.net/npm/v/@xignal/lit)](https://www.npmjs.com/package/@xignal/lit)

## Install

`npm i xignal @xignal/lit`

## Usage

### Basic

```ts

import { signal, computed } from "xignal";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);

```

```ts

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
			  <div>count ${this.countValue.value}</div>
			  <div>doubled ${this.doubledValue.value}</div>
		  </div>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

```

## License

MIT