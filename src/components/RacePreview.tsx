import React, { useEffect, useState } from 'react';
import { IonSkeletonText, IonItem, IonLabel, IonBadge, IonList, IonListHeader } from '@ionic/react';
import { Race } from '../models';

const RacePreview: React.FC = () => {
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    if (race === null) {
      fetch('https://ergast.com/api/f1/current/next.json')
        .then(res => res.json())
        .then(result => {
          setRace(result.MRData.RaceTable.Races[0]);
        });
    }
  }, [race]);

  if (race === null) {
    return (
      <IonList lines="none">
        <IonListHeader>&nbsp;</IonListHeader>
        <IonItem detail>
          <div slot="start">
            &nbsp;
          </div>
          <IonLabel>
            <h2><IonSkeletonText animated style={{ height: '11px', width: '70px' }}/></h2>
            <h3><IonSkeletonText animated style={{ height: '11px', width: '55px' }}/></h3>
            <p><IonSkeletonText animated style={{ height: '11px', width: '120px' }}/></p>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }
  return (
    <IonList lines="none">
      <IonListHeader>Next race</IonListHeader>
      <IonItem button detail href={`/race/${race.season}/${race.round}/${race.Circuit.Location.country}/${race.Circuit.circuitName}`}>
        <div slot="start" className="ion-text-center">
          {new Date(race.date).getDate()}<br/>
          <IonBadge color="medium">{new Date(race.date).toLocaleString('default', { month: 'short' })}</IonBadge>
        </div>
        <IonLabel>
          <p className="ion-text-uppercase text-primary">ROUND {race.round}</p>
          <h2 className="font-weight-bold">{race.Circuit.Location.country}</h2>
          <p>{race.raceName}</p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default RacePreview;