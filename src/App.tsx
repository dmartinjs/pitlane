import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { flagOutline, peopleOutline, speedometerOutline } from 'ionicons/icons';
import Races from './pages/Races';
import Drivers from './pages/Drivers';
import Constructors from './pages/Constructors';
import RaceDetails from './pages/RaceDetails';
import DriverDetails from './pages/DriverDetails';
import ConstructorDetails from './pages/ConstructorDetails/ConstructorDetails';
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
import DriverResults from './pages/DriverResults';
import ConstructorResults from './pages/ConstructorResults';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/races/:season" component={Races} />
          <Route path="/drivers/:season" component={Drivers} />
          <Route path="/constructors/:season" component={Constructors} />
          <Route path="/settings" component={Settings} />
          <Route path="/about" component={About} />
          <Route path="/race/:season/:round/:country/:circuit" component={RaceDetails} />
          <Route path="/driver/:driverId" component={DriverDetails} />
          <Route path="/driverresults/:season/:driverId" component={DriverResults} />
          <Route path="/constructor/:constructorId/:season" component={ConstructorDetails} />
          <Route path="/constructor-results/:season/:constructorId" component={ConstructorResults} />
          <Route path="/results/:season/:round/:session" component={Results} />
          <Route path="/racedata/:season/:round/:driverId" component={RaceData} />
          <Route path="/" render={() => <Redirect to={`/races/${new Date().getFullYear()}`} />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="races" href={`/races/${new Date().getFullYear()}`}>
            <IonIcon icon={flagOutline}/>
            <IonLabel>Races</IonLabel>
          </IonTabButton>
          <IonTabButton tab="drivers" href={`/drivers/${new Date().getFullYear()}`}>
            <IonIcon icon={peopleOutline}/>
            <IonLabel>Drivers</IonLabel>
          </IonTabButton>
          <IonTabButton tab="constructors" href={`/constructors/${new Date().getFullYear()}`}>
            <IonIcon icon={speedometerOutline}/>
            <IonLabel>Constructors</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
