import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Poker from './components/Poker/Poker';
import Home from './pages/Home/Home';
import { theme } from './service/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/game/:id'>
              <Poker />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
