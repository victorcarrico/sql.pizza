import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

// TODO: Do we really this component?

const MODE_ICON = {
  'dark': 'pi pi-sun',
  'light': 'pi pi-moon'
}

export default function ThemeButton({ onModeChange, theme }) {
  const [mode, setMode] = useState(theme);

  useEffect(() => {
    onModeChange(mode);
  }, [mode, onModeChange]);

  function switchMode(){
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }
  return (
    <Button icon={MODE_ICON[mode]} onClick={switchMode} />
  )
}
