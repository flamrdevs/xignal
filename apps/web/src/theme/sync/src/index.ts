import { defaultDriver } from "xignal/storage/driver";
import { FALLBACK_THEME, parseValidTheme, setHTMLAttr, STORAGE_KEY } from "../../core";

try {
	setHTMLAttr(parseValidTheme(defaultDriver.get(STORAGE_KEY, FALLBACK_THEME)));
} catch (error) {}
