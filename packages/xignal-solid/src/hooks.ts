import { createSignal, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): Accessor<T> {
	const [state, setState] = createSignal<T>(signal.get());

	onCleanup(
		effect(() => {
			setState(() => signal.get());
		}),
	);

	return state;
}
