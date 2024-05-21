import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useColorSchemeState = (): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const theme = localStorage.getItem('theme');

  const [value, setValue] = useState(theme === 'dark');

  useEffect(() => {
    if (value) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, [value]);

  return [value, setValue];
};

export function useColorScheme() {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined
  );

  const [isDark, setIsDark] = useColorSchemeState();

  const value = useMemo(
    () => (isDark === undefined ? !!systemPrefersDark : isDark),
    [isDark, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}
