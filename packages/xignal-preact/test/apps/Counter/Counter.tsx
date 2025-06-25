import * as xignal from "xignal";
import { useSignalValue } from "@xignal/preact";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

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
