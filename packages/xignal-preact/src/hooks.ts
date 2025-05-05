import { useEffect, useState } from "preact/hooks";
import type { Inputs } from "preact/hooks";

import { effect } from "xignal";
import type { ReadonlySignal, EffectFn } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): T {
	const [value, setValue] = useState<T>(() => signal.get());

	useEffect(
		() =>
			effect(() => {
				setValue(signal.get());
			}),
		[signal],
	);

	return value;
}

export function useSignalEffect(effectFn: EffectFn, inputs: Inputs | null = null): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: arg inputs
	useEffect(() => effect(effectFn), inputs === null ? [] : inputs);
}
