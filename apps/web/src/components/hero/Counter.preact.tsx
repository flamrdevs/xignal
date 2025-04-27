/* @jsxImportSource preact */

import { useSignalValue } from "@xignal/preact";

import { count } from "./counter";

const Counter = () => {
	const state = useSignalValue(count);
	return <div>{state}</div>;
};

export default Counter;
