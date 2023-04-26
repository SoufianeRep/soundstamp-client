import React, { useEffect, useLayoutEffect } from 'react';
import Dashboard from './pages/Dashboard';
import RootLayout from './components/RootLayout';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';
import CssBaseline from '@mui/joy/CssBaseline';
import customTheme from './theme';
import GlobalStyles from '@mui/joy/GlobalStyles';
import useScript from './utils/useScript';
import Login from './pages/Login';

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
    // <Login />
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
      <RootLayout>
        {/* <Login /> */}
        {/* <Dashboard /> */}
      </RootLayout>
    </CssVarsProvider>
  );
}

export default App;
