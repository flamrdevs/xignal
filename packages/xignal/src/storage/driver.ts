// biome-ignore lint/suspicious/noExplicitAny: valid any
export type Driver<T = any> = {
	get: (key: string, notFoundValue?: T) => T | undefined;
	set: (key: string, value: T) => void;
};

// biome-ignore lint/suspicious/noExplicitAny: valid any
export const createMemoryDriver = (store: Record<string, any> = {}): Driver => {
	return {
		get: (key, notFoundValue) => {
			return key in store ? store[key] : notFoundValue;
		},
		set: (key, value) => {
			store[key] = value;
		},
	};
};

export const createStorageDriver = (
	storage: Storage,
	// biome-ignore lint/suspicious/noExplicitAny: valid any
	{ parse, stringify }: { parse: (value: string) => any; stringify: (value: any) => string } = {
		parse: JSON.parse,
		stringify: JSON.stringify,
	},
): Driver => {
	return {
		get: (key, notFoundValue) => {
			try {
				const item = storage.getItem(key);
				if (typeof item === "string") return parse(item);
				return notFoundValue;
			} catch {
				return notFoundValue;
			}
		},
		set: (key, value) => {
			try {
				storage.setItem(key, stringify(value));
			} catch {}
		},
	};
};

export const defaultDriver: Driver = (() => {
	try {
		return createStorageDriver(localStorage);
	} catch {
		return createMemoryDriver();
	}
})();
