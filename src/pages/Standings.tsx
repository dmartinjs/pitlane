import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import DriverStandings from '../components/DriverStandings';
import ConstructorStandings from '../components/ConstructorStandings';
import RaceList from '../components/RaceList';

const Standings: React.FC = () => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('drivers');

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Standings</IonTitle>
          <IonButtons slot="end">
            <IonButton href="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onChange} value={selectedSegment}>
            <IonSegmentButton value="drivers">
              <IonLabel>Drivers</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="constructors">
              <IonLabel>Teams</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="results">
              <IonLabel>Races</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {selectedSegment === "drivers" && <DriverStandings/>}
        {selectedSegment === "constructors" && <ConstructorStandings/>}
        {selectedSegment === "results" && <RaceList results/>}
      </IonContent>
    </IonPage>
  );
};

export default Standings;
