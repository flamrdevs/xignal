import { useEffect, useSyncExternalStore } from "react";
import type { DependencyList } from "react";

import { effect } from "xignal";
import type { ReadonlySignal, EffectFn } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): T {
	const value = useSyncExternalStore<T>(
		(onStoreChange) =>
			effect(() => {
				signal.get();
				onStoreChange();
			}),
		() => signal.get(),
		() => signal.get(),
	);

	return value;
}

export function useSignalEffect(effectFn: EffectFn, deps: DependencyList | null = null): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: arg deps
	useEffect(() => effect(effectFn), deps === null ? [] : deps);
}
