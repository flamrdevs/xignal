import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseSignalValue } from "@xignal/lit";
import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

export const tagName = "component-counter";

@customElement(tagName)
class Counter extends LitElement {
	private countValue = new UseSignalValue(this, count);
	private doubledValue = new UseSignalValue(this, doubled);

	render() {
		return html`
      <div class="counter-container">
			  <div class="counter-count">count ${this.countValue.get}</div>
			  <div class="counter-doubled">doubled ${this.doubledValue.get}</div>
		  </div>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

export default Counter;
