import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { UseSignalValue } from "@xignal/lit";

import { count, doubled } from "./counter.state";

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
