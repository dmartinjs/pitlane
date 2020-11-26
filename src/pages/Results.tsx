import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import RaceResults from '../components/RaceResults';
import QualifyingResults from '../components/QualifyingResults';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string,
  round: string
}> {}

const Results: React.FC<RaceDetailsProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('race');

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
          <IonTitle>Results</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onChange} value={selectedSegment}>
            <IonSegmentButton value="qualifying">
              <IonLabel>Qualifying</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="race">
              <IonLabel>Race</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {selectedSegment === "qualifying" && <QualifyingResults season={match.params.season} round={match.params.round}/>}
        {selectedSegment === "race" && <RaceResults season={match.params.season} round={match.params.round}/>}
      </IonContent>
    </IonPage>
  );
};

export default Results;
