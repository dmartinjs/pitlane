import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { settingsSharp } from 'ionicons/icons';
import RacePreview from '../components/RacePreview';

const News: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
          <IonButtons slot="end">
            <IonButton href="/settings">
              <IonIcon slot="icon-only" icon={settingsSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RacePreview/>
      </IonContent>
    </IonPage>
  );
};

export default News;
