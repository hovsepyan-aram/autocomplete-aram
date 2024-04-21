import { useEffect, useRef } from 'react';

interface ICache<T> {
  getValue: (key: string) => T | undefined;
  setValue: (key: string, value: T) => void;
  _values: Record<string, T>;
}

export const useCache = <T>(timeout: number) => {
  const cache = useRef<ICache<T>>({
    _values: {},
    getValue: function (key) {
      return this._values[key];
    },
    setValue: function (key, value) {
      this._values[key] = value;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      cache.current._values = {};
    }, timeout);

    return () => clearInterval(interval);
  }, [timeout]);

  return cache;
};
