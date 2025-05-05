import { createEffect, createSignal, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

import { effect } from "xignal";
import type { ReadonlySignal, EffectFn } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): Accessor<T> {
	const [value, setValue] = createSignal<T>(signal.get());

	onCleanup(
		effect(() => {
			setValue(() => signal.get());
		}),
	);

	return value;
}

export function useSignalEffect(effectFn: EffectFn): void {
	let cleanup: void | (() => void);

	createEffect(() => {
		cleanup?.();
		cleanup = effect(effectFn);
	});

	onCleanup(() => {
		cleanup?.();
	});
}
