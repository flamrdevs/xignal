import { onUnmounted, shallowReadonly, shallowRef } from "vue";
import type { ShallowRef } from "vue";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): Readonly<ShallowRef<T>> {
	const state: ShallowRef<T> = shallowRef<T>(signal.get());

	onUnmounted(
		effect(() => {
			state.value = signal.get();
		}),
	);

	return shallowReadonly(state);
}
