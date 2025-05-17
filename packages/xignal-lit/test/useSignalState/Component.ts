import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import * as xignal from "xignal";
import { UseSignalState } from "@xignal/lit";

export const count = xignal.state(0);

export const tagName = "component-use-signal-state";

@customElement(tagName)
class Component extends LitElement {
	private countState = new UseSignalState(this, count);

	private onClick() {
		this.countState.update((n) => n + 1);
	}

	render() {
		return html`
      <button
			  type="button"
			  @click="${this.onClick}"
		  >
			  click : ${this.countState.get}
		  </button>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

export default Component;
