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
import CookieConsent from 'react-cookie-consent';
import React from 'react';

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
            <CookieConsent location="bottom" cookieName="planning-poker-privacy" expires={90} overlay>
              <h1>Privacy Information and Data Usage</h1>
              <h3>Use of Cookies and Browser Local Storage</h3>
              <p>To provide you with the best possible user experience when using our web application, we use cookies and your browser’s local storage.
                A cookie is used to manage your consent to these terms. Certain information is stored locally on your device in the local storage,
                such as settings, cached data, or the application’s status information. This data is stored exclusively on your device and
                is not transmitted to our servers or to third parties. The use of local storage is solely for technical and functional purposes
                and serves to ensure a user-friendly and efficient experience on our website.</p>
              <p>All information stored in the local storage can be viewed or deleted by you at any time via your browser settings.</p>
              <h3>Use of Google Firestore</h3>
              <p>Our web application uses Google Firestore, a cloud-based database service provided by Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Ireland (“Google”). Firestore enables us to store, synchronize, and
              retrieve data in real time. In doing so, personal data such as email addresses, user activities, or user-provided
              content may be processed and transferred to Google servers and stored there.</p>
              <p>The processing of data by Google Firestore is based on Article 6(1)(f) GDPR (legitimate interest), as offering
                a modern and stable web application cannot be ensured without this technology, or—if required for specific purposes—on the basis of your consent pursuant to Article 6(1)(a) GDPR.
                For further information on data processing by Google, please visit: https://policies.google.com/privacy</p>
              <p>It is possible that data may also be transferred to servers in the USA in the course of use. Google is certified under
                the EU-U.S. Data Privacy Framework, thus ensuring a level of protection appropriate to European data protection standards.</p>
            </CookieConsent>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
