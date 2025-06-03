import { defaultDriver } from "xignal/storage/driver";
import { FALLBACK_THEME, STORAGE_KEY, parseValidTheme, setHTMLAttr } from "../../core";

try {
	setHTMLAttr(parseValidTheme(defaultDriver.get(STORAGE_KEY, FALLBACK_THEME)));
} catch (error) {}
