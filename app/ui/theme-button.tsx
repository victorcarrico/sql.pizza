import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

const MODE_ICON = {
    'dark': 'pi pi-sun',
    'light': 'pi pi-moon'
}

export default function ThemeButton({ onModeChange }) {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        onModeChange(mode);
    }, [mode, onModeChange]);

    function switchThemeMode(){
        if (mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }
    return (
        <Button icon={MODE_ICON[mode]} className="p-button-warning" onClick={switchThemeMode} />
    )
}