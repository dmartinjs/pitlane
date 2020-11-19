import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import RaceList from '../components/RaceList';

const Races: React.FC = () => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('upcoming');

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Races</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onChange} value={selectedSegment}>
            <IonSegmentButton value="upcoming">
              <IonLabel>Upcoming</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="past">
              <IonLabel>Past</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Races</IonTitle>
          </IonToolbar>
        </IonHeader>
        {selectedSegment === "upcoming" && <RaceList/>}
        {selectedSegment === "past" && <RaceList past/>}
      </IonContent>
    </IonPage>
  );
};

export default Races;
