import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Race } from '../models';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string, 
  round: string
}> {}

const Races: React.FC<RaceDetailsProps> = ({match}) => {
  const [race, setRace] = useState<Race | null>(null);

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
            <IonTitle>{race && race.Circuit.Location.country}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{race && race.Circuit.Location.country} {race && race.season}</IonTitle>
            </IonToolbar>
          </IonHeader>
          {race && (
            <>
              <h3><strong className="ion-text-uppercase">{race.Circuit.Location.country}</strong> {race.season}</h3>
              <p className="ion-no-margin">{race.Circuit.circuitName}</p>
            </>
          )}
        </IonContent>
    </IonPage>
  );
};

export default Races;
