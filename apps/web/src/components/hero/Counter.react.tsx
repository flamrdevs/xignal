/* @jsxImportSource react */

import { useSignalValue } from "@xignal/react";

import { count } from "./counter";

const Counter = () => {
	const state = useSignalValue(count);
	return <div>{state}</div>;
};

export default Counter;
