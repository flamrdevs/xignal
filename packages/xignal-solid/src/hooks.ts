import { createEffect, createSignal, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): Accessor<T> {
	const [value, setValue] = createSignal<T>(signal.get());

	onCleanup(
		xignal.effect(() => {
			setValue(() => signal.get());
		}),
	);

	return value;
}

export function useSignalState<T>(
	signal: xignal.Signal.State<T>,
): [Accessor<T>, (action: xignal.UpdateAction<T>) => T] {
	return [useSignalValue<T>(signal), (action) => xignal.update(signal, action)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	let cleanup: void | (() => void);

	createEffect(() => {
		cleanup?.();
		cleanup = xignal.effect(effectFn);
	});

	onCleanup(() => {
		cleanup?.();
	});
}
