import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Race } from '../models';
import RaceResults from '../components/RaceResults';
import QualifyingResults from '../components/QualifyingResults';
import FastestLaps from '../components/FastestLaps';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string,
  round: string,
  session: string
}> {}

const Results: React.FC<RaceDetailsProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>(match.params.session);
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${match.params.season}/${match.params.round}.json`)
      .then(res => res.json())
      .then(result => {
        setRace(result.MRData.RaceTable.Races[0]);
      });
  }, [race, match.params.season, match.params.round]);

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
          <IonTitle>{race?.Circuit.Location.country} {race?.season}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onChange} value={selectedSegment} scrollable>
            <IonSegmentButton value="race">
              <IonLabel>Race</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="fastest">
              <IonLabel>Fastest Laps</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="qualifying">
              <IonLabel>Qualifying</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {selectedSegment === "qualifying" && <QualifyingResults season={match.params.season} round={match.params.round}/>}
        {selectedSegment === "race" && <RaceResults season={match.params.season} round={match.params.round}/>}
        {selectedSegment === "fastest" && <FastestLaps season={match.params.season} round={match.params.round}/>}
      </IonContent>
    </IonPage>
  );
};

export default Results;
