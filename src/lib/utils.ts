import { clsx, type ClassValue } from "clsx";
import { WritableAtom, atom, useSetAtom } from "jotai";
import { KeyboardEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

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

export const nextFieldOnEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
  if (e.key === "Enter") {
    const next = document.activeElement?.getAttribute("data-next");
    if (next) {
      e.preventDefault();
      document.getElementById(next)?.focus();
    }
  }
};

/**
 * TypeScript utility to narrow type based on Object key
 */
export function hasOwnProperty<X extends object, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * TypeScript utility to narrow to string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string" || value instanceof String;
}
