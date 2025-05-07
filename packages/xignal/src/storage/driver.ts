export type Driver<T = any> = {
	get: (key: string, notFoundValue?: T) => T | undefined;
	set: (key: string, value: T) => void;
};

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
			} catch (error) {
				return notFoundValue;
			}
		},
		set: (key, value) => {
			try {
				storage.setItem(key, stringify(value));
			} catch (error) {}
		},
	};
};

export const defaultDriver: Driver = (() => {
	try {
		return createStorageDriver(localStorage);
	} catch (error) {
		return createMemoryDriver();
	}
})();
