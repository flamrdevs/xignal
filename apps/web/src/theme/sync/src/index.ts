import { defaultDriver } from "xignal/storage/driver";

import { FALLBACK_THEME, parseValidTheme, STORAGE_KEY, setHTMLAttr } from "../../core";

try {
	setHTMLAttr(parseValidTheme(defaultDriver.get(STORAGE_KEY, FALLBACK_THEME)));
} catch {}
