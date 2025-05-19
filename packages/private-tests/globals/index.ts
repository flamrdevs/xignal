import * as vt from "vitest";

import { cleanupable } from "../utils";

export const cleanup = cleanupable();

vt.beforeEach(() => {
	cleanup();
});
