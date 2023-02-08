import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import RaceList from '../components/race/RaceList';
import { RouteComponentProps } from 'react-router';

interface RacesProps extends RouteComponentProps<{
  season: string,
}> {}

const Races: React.FC<RacesProps> = ({match}) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Races</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline} aria-label="settings"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RaceList season={match.params.season}/>
      </IonContent>
    </IonPage>
  );
};

export default Races;
