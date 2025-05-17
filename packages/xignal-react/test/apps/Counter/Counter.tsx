import * as xignal from "xignal";
import { useSignalValue } from "@xignal/react";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

const Counter = () => {
	const countValue = useSignalValue(count);
	const doubledValue = useSignalValue(doubled);
	return (
		<div className="counter-container">
			<div className="counter-count">count {countValue}</div>
			<div className="counter-doubled">doubled {doubledValue}</div>
		</div>
	);
};

export default Counter;
