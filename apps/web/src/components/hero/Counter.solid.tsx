/* @jsxImportSource solid-js */

import { useSignalValue } from "@xignal/solid";

import { count } from "./counter";

const Counter = () => {
	const state = useSignalValue(count);
	return <div>{state()}</div>;
};

export default Counter;
