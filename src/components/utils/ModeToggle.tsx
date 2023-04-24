import React, { useState, useEffect } from 'react';
import { useColorScheme } from '@mui/joy';
import Button from '@mui/joy/Button';

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Toggle Dark Mode' : 'Toggle Light Mode'}
    </Button>
  );
}
