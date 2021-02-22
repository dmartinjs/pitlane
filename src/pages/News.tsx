import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import RacePreview from '../components/RacePreview';
import NewsFeed from '../components/NewsFeed';

const News: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
          <IonButtons slot="end">
            <IonButton href="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RacePreview/>

        <NewsFeed/>
      </IonContent>
    </IonPage>
  );
};

export default News;
