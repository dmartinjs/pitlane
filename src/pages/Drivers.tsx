import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import DriverStandings from '../components/driver/DriverStandings/DriverStandings';
import { RouteComponentProps } from 'react-router';

interface DriversProps extends RouteComponentProps<{
  season: string,
}> {}

const Drivers: React.FC<DriversProps> = ({match}) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Drivers</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline} aria-label="settings"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DriverStandings season={match.params.season}/>
      </IonContent>
    </IonPage>
  );
};

export default Drivers;
