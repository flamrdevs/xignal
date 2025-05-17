import { createMemo } from "solid-js";
import type { JSX } from "solid-js";

import type * as xignal from "xignal";

import { useSignalValue } from "./hooks";

export function Show(props: {
	when: xignal.ReadonlySignal<unknown>;
	children?: JSX.Element;
	fallback?: JSX.Element;
}): JSX.Element {
	const when = useSignalValue(props.when);
	return createMemo(() => (when() ? props.children : props.fallback)) as unknown as JSX.Element;
}
