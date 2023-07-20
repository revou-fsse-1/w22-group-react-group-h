import { useState } from 'react';

export const useLocalStorageNew = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? item : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    //const valueToStore = value instanceof Function ? value(storedValue) : value;
    const valueToStore = value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, valueToStore);
  };

  return [storedValue, setValue];
};
