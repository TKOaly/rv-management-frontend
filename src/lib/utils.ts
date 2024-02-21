import { clsx, type ClassValue } from "clsx";
import { WritableAtom, atom, useSetAtom } from "jotai";
import { twMerge } from "tailwind-merge";

/**
 * Merge tailwind classes together removing duplicates
 */
export function merge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * An atom with a setter that allows for Partial<> update values allowing
 * to update only the given properties of the atom while keeping the others intact.
 * @param atomToSet any WritableAtom
 * @returns a read-only atom
 * @example
 * const userAtom = atom({ name: "John", age: 30 });
 * const setUserAtom = useSetAtom(partialSetAtom(userAtom));
 * setUserAtom({ name: "Jane" }); // { name: "Jane", age: 30 }
 */
const partialSetAtom = <T>(
  atomToSet: WritableAtom<T, [T & Partial<T>], unknown>,
) => {
  return atom(null, (get, set, update: Partial<T>) => {
    set(atomToSet, { ...get(atomToSet), ...update });
  });
};

/**
 * A hook that returns an atom set function that allows for Partial<> update values
 * allowing to update only the given properties of the atom while keeping the others intact.
 * @param atom any WritableAtom
 * @returns an atom set function
 * @example
 * const userAtom = atom({ name: "John", age: 30 });
 * const setUserAtom = usePartialSetAtom(userAtom);
 * setUserAtom({ name: "Jane" }); // { name: "Jane", age: 30 }
 */
export const usePartialSetAtom = <T>(
  atom: WritableAtom<T, [T & Partial<T>], unknown>,
) => useSetAtom(partialSetAtom(atom));
