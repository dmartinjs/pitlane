import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
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
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onChange} value={selectedSegment}>
            <IonSegmentButton value="drivers">
              <IonLabel>Drivers</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="constructors">
              <IonLabel>Constructors</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="results">
              <IonLabel>Results</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Standings</IonTitle>
          </IonToolbar>
        </IonHeader>
        {selectedSegment === "drivers" && <DriverStandings/>}
        {selectedSegment === "constructors" && <ConstructorStandings/>}
        {selectedSegment === "results" && <RaceList past results/>}
      </IonContent>
    </IonPage>
  );
};

export default Standings;
