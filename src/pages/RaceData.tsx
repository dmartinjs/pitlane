import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface RaceDataProps extends RouteComponentProps<{
  season: string,
  round: string,
  driverId: string
}> {}

const RaceData: React.FC<RaceDataProps> = ({match}) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
          <IonTitle>Race Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default RaceData;
