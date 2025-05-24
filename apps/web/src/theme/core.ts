export type Theme = (typeof THEMES)[number];

export const THEMES = ["dark", "light"] as const satisfies string[];
export const FALLBACK_THEME = THEMES[0];

export const isValidTheme = (value: unknown): value is Theme =>
	typeof value === "string" && THEMES.includes(value as Theme);
export const parseValidTheme = (value: unknown): Theme => (isValidTheme(value) ? value : FALLBACK_THEME);

export const STORAGE_KEY = "thx";

export const setHTMLAttr = (theme: Theme) => {
	document.documentElement.setAttribute("data-thx", theme);
};
