import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import RacePreview from '../components/RacePreview';
import News from '../components/News';

const Latest: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pitlane</IonTitle>
          <IonButtons slot="end">
            <IonButton href="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RacePreview/>

        <News/>
      </IonContent>
    </IonPage>
  );
};

export default Latest;
