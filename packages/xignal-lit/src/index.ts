import type { ReactiveController, ReactiveControllerHost } from "lit";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export class UseSignalValue<T> implements ReactiveController {
	private _value: T;
	private stop: (() => void) | undefined;

	constructor(
		private host: ReactiveControllerHost,
		private signal: ReadonlySignal<T>,
	) {
		host.addController(this);
		this._value = this.signal.get();
	}

	hostConnected(): void {
		this.stop = effect(() => {
			this._value = this.signal.get();
			this.host.requestUpdate();
		});
	}

	hostDisconnected(): void {
		this.stop?.();
	}

	get value(): T {
		return this._value;
	}
}
