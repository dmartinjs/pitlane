import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RacePreview from '../components/RacePreview';

const News: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formula 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formula 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RacePreview/>
      </IonContent>
    </IonPage>
  );
};

export default News;
