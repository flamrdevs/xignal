import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseSignalValue } from "@xignal/lit";

import { count } from "./counter";

@customElement("counter-lit")
class Counter extends LitElement {
	private state = new UseSignalValue(this, count);

	render() {
		return html`<div>${this.state.value}</div>`;
	}

	createRenderRoot() {
		return this;
	}
}

export default Counter;
