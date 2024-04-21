import { useRef } from 'react';

// keeping the callback params but losing the return value
export const useDebounce = <T extends (...args: any) => any>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  };
};
