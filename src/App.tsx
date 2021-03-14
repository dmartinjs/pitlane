import React from 'react';
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
import { newspaperOutline, podiumOutline, calendarOutline } from 'ionicons/icons';
import Latest from './pages/Latest';
import Standings from './pages/Standings';
import Races from './pages/Races';
import RaceDetails from './pages/RaceDetails';
import DriverDetails from './pages/DriverDetails';
import ConstructorDetails from './pages/ConstructorDetails';
import Results from './pages/Results';
import Settings from './pages/Settings';
import About from './pages/About';

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
import RaceData from './pages/RaceData';

const App: React.FC = () => {

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/latest" component={Latest} />
          <Route path="/standings" component={Standings} />
          <Route path="/races" component={Races} />
          <Route path="/settings" component={Settings} />
          <Route path="/about" component={About} />
          <Route path="/race/:season/:round/:country/:circuit" component={RaceDetails} />
          <Route path="/driver/:driverId" component={DriverDetails} />
          <Route path="/constructor/:constructorId" component={ConstructorDetails} />
          <Route path="/results/:season/:round/:session" component={Results} />
          <Route path="/racedata/:season/:round/:driverId" component={RaceData} />
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
            <IonIcon icon={calendarOutline}/>
            <IonLabel>Schedule</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
