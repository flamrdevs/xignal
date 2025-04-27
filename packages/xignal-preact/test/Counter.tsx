import { useSignalValue } from "@xignal/preact";

import { count, doubled } from "./counter.state";

const Counter = () => {
	const countValue = useSignalValue(count);
	const doubledValue = useSignalValue(doubled);
	return (
		<div class="counter-container">
			<div class="counter-count">count {countValue}</div>
			<div class="counter-doubled">doubled {doubledValue}</div>
		</div>
	);
};

export default Counter;
