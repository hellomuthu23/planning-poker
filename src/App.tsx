import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

function App() {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <div className='App'>
        <Home />
      </div>
    </StylesProvider>
  );
}

export default App;
