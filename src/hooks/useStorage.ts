import { useState, useEffect } from "react";

export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carica i dati dal localStorage al mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Errore nel caricamento ${key}:`, error);
    }
    setIsLoaded(true);
  }, [key]);

  // Salva i dati nel localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Errore nel salvataggio ${key}:`, error);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
}
