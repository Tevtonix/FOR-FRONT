import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import type { Updater } from 'use-immer';

export function useImmerLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Updater<T>] {
  const [storedValue, setStoredValue] = useImmer<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}