import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import RaceList from '../components/RaceList';

const Races: React.FC = () => {

  const getYear = () => {
    return new Date().getFullYear();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Racing</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline} ariaLabel="settings"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RaceList season={getYear()}/>
      </IonContent>
    </IonPage>
  );
};

export default Races;
