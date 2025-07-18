import * as vt from "vitest";

import * as xignal from "xignal";

export const count = xignal.state(0);

export const fnEffect = vt.vi.fn();
export const fnEffectCleanup = vt.vi.fn();
