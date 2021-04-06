import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Toolbar } from './components/Toolbar/Toolbar';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import { JoinGamePage } from './pages/JoinGamePage/JoinGamePage';
import { theme } from './service/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />

        <Router>
          <Toolbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/game/:id/join' component={JoinGamePage} />
            <Route path='/game/:id' component={GamePage} />
          </Switch>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
