import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonItem, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Race } from '../models';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string, 
  round: string
}> {}

const Races: React.FC<RaceDetailsProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('circuit');
  const [race, setRace] = useState<Race | null>(null);

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${match.params.season}/${match.params.round}.json`)
      .then(res => res.json())
      .then(result => setRace(result.MRData.RaceTable.Races[0]));
  }, [match.params.season, match.params.round]);

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/races"></IonBackButton>
            </IonButtons>
            <IonTitle>{race && race.Circuit.Location.country} {race && race.season}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSegment onIonChange={onChange} value={selectedSegment}>
              <IonSegmentButton value="circuit">
                <IonLabel>Circuit</IonLabel>
              </IonSegmentButton>
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{race && race.Circuit.Location.country} {race && race.season}</IonTitle>
            </IonToolbar>
          </IonHeader>
          {selectedSegment === "circuit" && race && (
            <IonItem>
              <IonLabel>
                <h2><strong>{race.Circuit.Location.country}</strong> {race.season}</h2>
                <h3>{race.Circuit.circuitName}</h3>
              </IonLabel>
            </IonItem>
          )}
          {selectedSegment === "qualifying" && ''}
          {selectedSegment === "race" && ''}
        </IonContent>
    </IonPage>
  );
};

export default Races;
