export const cleanupable = () => {
	type Fn = () => void;

	const sets = new Set<Fn>();

	return (fn?: Fn) => {
		if (typeof fn === "undefined") {
			for (const set of sets) {
				set();
				sets.delete(set);
			}
		} else {
			sets.add(fn);
		}
	};
};
