import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <Router>
        <Toolbar />
        <Switch>
          <Route path='/game/:id' component={GamePage} />
          <Route path='/join/:id' component={HomePage} />
          <Route exact path='/*' component={HomePage} />
        </Switch>
      </Router>
    </StylesProvider>
  );
}

export default App;
