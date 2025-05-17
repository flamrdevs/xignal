import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import * as xignal from "xignal";
import { UseSignalState } from "@xignal/lit";

export const global = xignal.state(0);

@customElement("component-main")
class Component extends LitElement {
	private globalValue = new UseSignalState(this, global);

	private onClick() {
		this.globalValue.update((n) => n + 1);
	}

	render() {
		return html`
      <button
			  type="button"
			  @click="${this.onClick}"
		  >
			  click : ${this.globalValue.value}
		  </button>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

export default Component;
