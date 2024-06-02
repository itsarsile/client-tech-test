'use client';

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitchMenu() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering the component until it is mounted
    return null;
  }

  return (
    <>
      {theme === 'light' ? (
        <SunIcon className="w-8 lg:w-4" onClick={() => setTheme('dark')} />
      ) : (
        <MoonIcon className="lg:w-4 w-8" onClick={() => setTheme('light')} />
      )}
    </>
  );
}
