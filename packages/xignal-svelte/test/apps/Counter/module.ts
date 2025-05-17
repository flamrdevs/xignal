import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);
