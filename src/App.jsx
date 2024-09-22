import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

import './App.scss';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app-container">test</div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
