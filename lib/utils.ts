import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isMinuteInRange = (str: string): boolean => {
  const num = Number(str);
  return !isNaN(num) && num >= 0 && num <= 120;
}

export const isSecondInRange = (str: string): boolean => {
  const num = Number(str);
  return !isNaN(num) && num >= 0 && num <= 60;
}

export const formatMinutesAndSeconds = (str: string | null): string => {
  if (str === null) {
    return "00";
  }

  const num = Number(str);
  if (!isNaN(num) && num >= 0) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return String(num);
    }
  }

  throw new Error(`Invalid number: ${str}`);
};

export const generateTimeOptions = (): number[] => {
  const list: number[] = [];
  for (let i = 15; i <= 120; i += 5) {
    list.push(i);
  }
  return list;
};