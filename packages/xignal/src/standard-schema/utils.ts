import type { StandardSchemaV1 } from "@standard-schema/spec";

export type Out<Schema extends StandardSchemaV1> = StandardSchemaV1.InferOutput<Schema>;

export const createParse = <S extends StandardSchemaV1>(schema: S): ((input: unknown) => Out<S>) => {
	return (input: unknown) => {
		const result = schema["~standard"].validate(input);
		if (result instanceof Promise) {
			throw new TypeError("Schema validation must be synchronous");
		}
		if (result.issues) {
			throw new Error(JSON.stringify(result.issues, null, 2));
		}
		return result.value;
	};
};
