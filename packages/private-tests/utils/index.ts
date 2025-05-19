type CleanupFn = () => void;

export const cleanupable = () => {
	const sets = new Set<CleanupFn>();

	function cleanup(): void;
	function cleanup(fn: CleanupFn): CleanupFn;
	function cleanup(fn?: CleanupFn): void | CleanupFn {
		if (typeof fn === "undefined") {
			for (const set of sets) {
				set();
				sets.delete(set);
			}
		} else {
			sets.add(fn);
			return fn;
		}
	}

	return cleanup;
};
