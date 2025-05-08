import { onUnmounted, shallowReadonly, shallowRef, watchEffect } from "vue";
import type { ShallowRef } from "vue";

import { effect } from "xignal";
import type { ReadonlySignal, EffectFn } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): Readonly<ShallowRef<T>> {
	const value: ShallowRef<T> = shallowRef<T>(signal.get());

	onUnmounted(
		effect(() => {
			value.value = signal.get();
		}),
	);

	return shallowReadonly(value);
}

export function useSignalEffect(effectFn: EffectFn): void {
	watchEffect((onCleanup) => {
		onCleanup(effect(effectFn));
	});
}
