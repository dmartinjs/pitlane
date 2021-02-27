import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { newspaperOutline, podiumOutline, flagOutline } from 'ionicons/icons';
import Latest from './pages/Latest';
import Standings from './pages/Standings';
import Races from './pages/Races';
import Settings from './pages/Settings';
import RaceDetails from './pages/RaceDetails';
import DriverDetails from './pages/DriverDetails';
import ConstructorDetails from './pages/ConstructorDetails';
import Results from './pages/Results';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';

/* Theme variables */
import './theme/variables.css';

/* Global styles */
import './App.css';

const App: React.FC = () => {

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((e) => checkToggle(e.matches));

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck: boolean) {
      document.body.classList.toggle('dark', shouldCheck);
    }

    checkToggle(prefersDark.matches);
  }, [])

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/latest" component={Latest} exact={true} />
          <Route path="/standings" component={Standings} exact={true} />
          <Route path="/races" component={Races} exact={true} />
          <Route path="/settings" component={Settings} exact={true} />
          <Route path="/race/:season/:round/:country/:circuit" component={RaceDetails} />
          <Route path="/driver/:driverId" component={DriverDetails} />
          <Route path="/constructor/:constructorId" component={ConstructorDetails} />
          <Route path="/results/:season/:round/:session" component={Results} />
          <Route path="/" render={() => <Redirect to="/latest" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="latest" href="/latest">
            <IonIcon icon={newspaperOutline}/>
            <IonLabel>Latest</IonLabel>
          </IonTabButton>
          <IonTabButton tab="standings" href="/standings">
            <IonIcon icon={podiumOutline}/>
            <IonLabel>Standings</IonLabel>
          </IonTabButton>
          <IonTabButton tab="races" href="/races">
            <IonIcon icon={flagOutline}/>
            <IonLabel>Racing</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
