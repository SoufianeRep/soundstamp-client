import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';
import CssBaseline from '@mui/joy/CssBaseline';
import customTheme from './theme';
import GlobalStyles from '@mui/joy/GlobalStyles';
import useScript from './utils/useScript';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import DropboxPage from './pages/DropboxPage';
import AdminTools from './pages/AdminTools';
import Projects from './pages/Projects';
import PrivateLayout from './utils/PrivateLayout';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function App() {
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange theme={customTheme}>
      <GlobalStyles
        styles={{
          '[data-feather], .feather': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '1em',
            height: '1em',
          },
        }}
      />
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/dropbox" element={<DropboxPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<AdminTools />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
