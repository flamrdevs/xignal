import { effect, update } from "xignal";
import { state } from "xignal/storage";

import { FALLBACK_THEME, STORAGE_KEY, type Theme, setHTMLAttr } from "./core";

export const theme = state<Theme>(STORAGE_KEY, FALLBACK_THEME);

if (typeof window !== "undefined") {
	effect(() => {
		setHTMLAttr(theme.get());
	});
}

export const toggleTheme = () => {
	update(theme, (state) => (state === "dark" ? "light" : "dark"));
};
