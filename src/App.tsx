import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
            <Routes>
              <Route path='/game/:id' element={<GamePage />} />
              <Route path='/delete-old-games' element={<DeleteOldGames />} />
              <Route path='/join/:id' element={<JoinPage />} />
              <Route path='/about-planning-poker' element={<AboutPage />} />
              <Route path='/examples' element={<ExamplesPage />} />
              <Route path='/guide' element={<GuidePage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={<HomePage />} />
            </Routes>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
