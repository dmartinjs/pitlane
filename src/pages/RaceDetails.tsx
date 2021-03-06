import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Schedule from '../components/race/Schedule';
import Circuit from '../components/circuit/Circuit';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string, 
  round: string,
  country: string,
  circuit: string
}> {}

const RaceDetails: React.FC<RaceDetailsProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('schedule');

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/races"></IonBackButton>
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <IonSegment onIonChange={onChange} value={selectedSegment}>
          <IonSegmentButton value="schedule">
            <IonLabel>Schedule</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="circuit">
            <IonLabel>Circuit</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {selectedSegment === "schedule" && <Schedule season={match.params.season} round={match.params.round}/>}
      {selectedSegment === "circuit" && <Circuit season={match.params.season} round={match.params.round} circuit={match.params.circuit}/>}
    </IonContent>
  </IonPage>
  );
};

export default RaceDetails;
