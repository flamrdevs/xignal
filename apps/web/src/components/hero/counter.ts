import { signal, effect, update } from "xignal";

export const count = signal<number>(0);
export const dir = signal<"up" | "down">("up");

effect(() => {
	const countValue = count.get();
	const dirValue = dir.get();
	if (dirValue === "up" && countValue >= 9) dir.set("down");
	if (dirValue === "down" && countValue <= -9) dir.set("up");
});

export const handleUpdate = () => {
	update(count, (count) => {
		const dirValue = dir.get();

		if (dirValue === "up") return count + 1;
		if (dirValue === "down") return count - 1;
		return count;
	});
};
