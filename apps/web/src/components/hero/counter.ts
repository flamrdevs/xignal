import * as xignal from "xignal";

export const count = xignal.state<number>(0);
export const dir = xignal.state<"up" | "down">("up");

xignal.effect(() => {
	const countValue = count.get();
	const dirValue = dir.get();
	if (dirValue === "up" && countValue >= 9) dir.set("down");
	if (dirValue === "down" && countValue <= -9) dir.set("up");
});

export const handleUpdate = () => {
	xignal.update(count, (count) => {
		const dirValue = dir.get();

		if (dirValue === "up") return count + 1;
		if (dirValue === "down") return count - 1;
		return count;
	});
};
