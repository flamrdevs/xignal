import type { ReactiveController, ReactiveControllerHost } from "lit";

import * as xignal from "xignal";

export class UseSignalValue<T> implements ReactiveController {
	private _get: T;
	private stop: (() => void) | undefined;

	constructor(
		private host: ReactiveControllerHost,
		protected signal: xignal.ReadonlySignal<T>,
	) {
		host.addController(this);
		this._get = this.signal.get();
	}

	hostConnected(): void {
		this.stop = xignal.effect(() => {
			this._get = this.signal.get();
			this.host.requestUpdate();
		});
	}

	hostDisconnected(): void {
		this.stop?.();
	}

	get get(): T {
		return this._get;
	}
}

export class UseSignalState<T> extends UseSignalValue<T> {
	constructor(
		host: ReactiveControllerHost,
		protected signal: xignal.Signal.State<T>,
	) {
		super(host, signal);
	}

	update(fn: xignal.UpdateFn<T>): T {
		return xignal.update(this.signal, fn);
	}
}

export function createStateWithUseSignalValue<T>(): [
	xignal.Signal.State<T | undefined>,
	(host: ReactiveControllerHost) => UseSignalValue<T | undefined>,
];
export function createStateWithUseSignalValue<T>(
	initialValue: T,
): [xignal.Signal.State<T>, (host: ReactiveControllerHost) => UseSignalValue<T>];
export function createStateWithUseSignalValue<T>(
	initialValue?: T,
): [xignal.Signal.State<T | undefined>, (host: ReactiveControllerHost) => UseSignalValue<T | undefined>] {
	const state = xignal.state<T | undefined>(initialValue);
	return [state, (host) => new UseSignalValue(host, state)];
}

export function createComputedWithUseSignalValue<T>(
	getter: xignal.ComputedGetterFn<T>,
): [xignal.Signal.Computed<T>, (host: ReactiveControllerHost) => UseSignalValue<T>] {
	const computed = xignal.computed<T>(getter);
	return [computed, (host) => new UseSignalValue(host, computed)];
}
