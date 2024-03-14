import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const compactModeAtom = atomWithStorage("compactMode", false);

export const useCompactMode = () => useAtomValue(compactModeAtom);
