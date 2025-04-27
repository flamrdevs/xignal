import { useSignalValue } from "@xignal/react";

import { count, doubled } from "./counter.state";

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
