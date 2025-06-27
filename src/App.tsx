import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Loading } from './components/Loading/Loading';
import { Toolbar } from './components/Toolbar/Toolbar';
import { AboutPage } from './pages/AboutPage/AboutPage';
import DeleteOldGames from './pages/DeleteOldGames/DeleteOldGames';
import { ExamplesPage } from './pages/ExamplesPage/ExamplesPage';
import { GamePage } from './pages/GamePage/GamePage';
import { GuidePage } from './pages/GuidePage/GuidePage';
import HomePage from './pages/HomePage/HomePage';
import JoinPage from './pages/JoinPage/JoinPage';

polyfillCountryFlagEmojis();

function App() {
  return (
    <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <Suspense
        fallback={
          <div className='text-center items-center justify-center flex h-screen'>
            <Loading />
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
}

export default App;
