import type { ReactiveController, ReactiveControllerHost } from "lit";

import * as xignal from "xignal";

export class UseSignalValue<T> implements ReactiveController {
	private _value: T;
	private stop: (() => void) | undefined;

	constructor(
		private host: ReactiveControllerHost,
		protected signal: xignal.ReadonlySignal<T>,
	) {
		host.addController(this);
		this._value = this.signal.get();
	}

	hostConnected(): void {
		this.stop = xignal.effect(() => {
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

export class UseSignalState<T> extends UseSignalValue<T> {
	constructor(
		host: ReactiveControllerHost,
		protected signal: xignal.Signal.State<T>,
	) {
		super(host, signal);
	}

	update(action: xignal.UpdateAction<T>): T {
		return xignal.update(this.signal, action);
	}
}
