import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { signal, computed } from "xignal";
import { UseSignalValue } from "@xignal/lit";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);

@customElement("component-counter")
class Counter extends LitElement {
	private countValue = new UseSignalValue(this, count);
	private doubledValue = new UseSignalValue(this, doubled);

	render() {
		return html`
      <div class="counter-container">
			  <div class="counter-count">count ${this.countValue.value}</div>
			  <div class="counter-doubled">doubled ${this.doubledValue.value}</div>
		  </div>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

export default Counter;
