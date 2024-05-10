// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@gravity-ui/uikit';
import App from './App';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
