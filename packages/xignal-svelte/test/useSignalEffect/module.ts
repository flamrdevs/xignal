import * as vt from "vitest";

import { signal } from "xignal";

export const global = signal(0);

export const fnEffect = vt.vi.fn();
export const fnEffectCleanup = vt.vi.fn();
