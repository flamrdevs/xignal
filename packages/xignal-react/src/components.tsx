import type { ReactNode } from "react";

import type { ReadonlySignal } from "xignal";

import { useSignalValue } from "./hooks";

export function Show(props: { when: ReadonlySignal<unknown>; children?: ReactNode; fallback?: ReactNode }): ReactNode {
	return useSignalValue(props.when) ? props.children : props.fallback;
}
