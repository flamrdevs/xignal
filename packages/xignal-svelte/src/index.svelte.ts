import { onDestroy } from "svelte";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): Readonly<{
	value: T;
}> {
	let value = $state<T>(signal.get());

	onDestroy(
		effect(() => {
			value = signal.get();
		}),
	);

	return {
		get value() {
			return value;
		},
	};
}
