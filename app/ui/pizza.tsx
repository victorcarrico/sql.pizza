'use client'

import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import Editor from '@monaco-editor/react';
import { format } from 'sql-formatter';
import ThemeButton from './theme-button';

export default function Pizza() {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const STORAGE_KEYS = {
    content: 'monaco-editor-content',
    theme: 'monaco-editor-theme'
  }
   ;
  const [editorValue, setEditorValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.content) || '';
    } else {
      return ''
    }
  });
  let theme = localStorage.getItem(STORAGE_KEYS.theme) || 'light';


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    switchTheme(theme);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
    localStorage.setItem(STORAGE_KEYS.content, value);
  };

  function beautifySQL() {
    editorRef.current.setValue(format(editorRef.current.getValue()));
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(editorRef.current.getValue());
  }

  function switchTheme(mode) {
    if (!monacoRef.current) return;

    if (mode === 'light') {
      import('monaco-themes/themes/Github Light.json')
      .then(data => {
        monacoRef.current.editor.defineTheme('github-light', data);
      })
      .then(_ => monacoRef.current.editor.setTheme('github-light'))
    } else {
      import('monaco-themes/themes/Github Dark.json')
      .then(data => {
        monacoRef.current.editor.defineTheme('github-dark', data);
      })
      .then(_ => monacoRef.current.editor.setTheme('github-dark'))
    }
    localStorage.setItem(STORAGE_KEYS.theme, mode);
  }

  return (
    <div className="main-container">
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="sql"
          defaultValue={editorValue}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            minimap: {
              enabled: false,
            },
            theme: 'vs-dark',
            fontFamily: "Menlo, Consolas, 'Courier New', monospace",
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>
      <div className="button-container">
        <Button label="Format" onClick={beautifySQL} />
        <Button icon="pi pi-copy" onClick={copyToClipboard} />
        <ThemeButton onModeChange={switchTheme} theme={theme} />
      </div>
    </div>
  );
}