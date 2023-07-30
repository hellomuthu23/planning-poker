import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';
import DeleteOldGames from './pages/DeleteOldGames/DeleteOldGames';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import JoinPage from './pages/JoinPage/JoinPage';
import { theme } from './service/theme';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ExamplesPage } from './pages/ExamplesPage/ExamplesPage';
import { GuidePage } from './pages/GuidePage/GuidePage';

function App() {
  return (
    <div className='LightTheme'>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Router>
            <Toolbar />
            <Switch>
              <Route path='/game/:id' component={GamePage} />
              <Route path='/delete-old-games' component={DeleteOldGames} />
              <Route path='/join/:id' component={JoinPage} />
              <Route path='/about-planning-poker' component={AboutPage} />
              <Route path='/examples' component={ExamplesPage} />
              <Route path='/guide' component={GuidePage} />
              <Route exact path='/*' component={HomePage} />
            </Switch>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
