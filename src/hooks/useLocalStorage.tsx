import { useEffect, useState } from 'react';

export function useLocalStorage(key: string) {
  const [data, setData] = useState<string>('');

  const setLocalStorage = (data: string) => {
    localStorage.setItem(key, data);
    setData(data);
  };

  useEffect(() => {
    const localData = localStorage.getItem(key);
    if (localData) {
      setData(localData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, setLocalStorage];
}
