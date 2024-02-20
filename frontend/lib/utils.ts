import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberWithCommas = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

type NullableObject<T> = {
  [K in keyof T]: T[K] extends null ? never : T[K];
};

export function filterNullValues<T>(obj: T): NullableObject<T> {
  const result: Partial<NullableObject<T>> = {};

  for (const key in obj) {
    if (obj[key] !== null) {
      result[key] = obj[key] as any;
    }
  }

  return result as NullableObject<T>;
}
