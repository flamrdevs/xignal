import type { ReactNode } from "react";

import type * as xignal from "xignal";

import { useSignalValue } from "./hooks";

export function Show(props: {
	when: xignal.ReadonlySignal<unknown>;
	children?: ReactNode;
	fallback?: ReactNode;
}): ReactNode {
	return useSignalValue(props.when) ? props.children : props.fallback;
}
