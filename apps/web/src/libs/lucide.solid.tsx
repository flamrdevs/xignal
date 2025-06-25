import type { JSX } from "solid-js";
import { For, splitProps } from "solid-js";
import { createDynamic } from "solid-js/web";

import type { IconNode } from "lucide";

const each = ([tag, attrs]: IconNode[number]) => createDynamic(() => tag, attrs);

export const LucideIcon = (
	propss: JSX.SvgSVGAttributes<SVGSVGElement> & {
		i: IconNode;
	},
) => {
	const [local, rest] = splitProps(propss, ["i", "class"]);

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: ok
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class={`lucide${local.class ? ` ${local.class}` : ""}`}
			{...rest}
		>
			<For each={local.i}>{each}</For>
		</svg>
	);
};
