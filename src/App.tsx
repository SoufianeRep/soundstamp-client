import React, { useEffect, useLayoutEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RootLayout from './components/RootLayout';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';
import customTheme from './theme';
import GlobalStyles from '@mui/joy/GlobalStyles';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function App() {
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
      <RootLayout>
        <Dashboard />
      </RootLayout>
    </CssVarsProvider>
  );
}

export default App;
