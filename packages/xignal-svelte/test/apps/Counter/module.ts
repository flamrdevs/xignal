import { signal, computed } from "xignal";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);
