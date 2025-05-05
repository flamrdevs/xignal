import { useSyncExternalStore } from "react";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

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
