import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
    return (_jsx(Button, Object.assign({ variant: "outlined", onClick: () => {
            setMode(mode === 'light' ? 'dark' : 'light');
        } }, { children: mode === 'light' ? 'Toggle Dark Mode' : 'Toggle Light Mode' })));
}
