import React, { useEffect, useState } from 'react';
import { IonSkeletonText, IonItem, IonLabel, IonBadge, IonList, IonListHeader, IonIcon } from '@ionic/react';
import { Race } from '../../models';

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
      <IonList lines="full">
        <IonListHeader>&nbsp;</IonListHeader>
        <IonItem>
          <div slot="start" className="race-date">
            &nbsp;
          </div>
          <IonLabel>
            <h3><IonSkeletonText animated style={{ height: '11px', width: '55px' }}/></h3>
            <p><IonSkeletonText animated style={{ height: '11px', width: '120px' }}/></p>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }
  if(race === undefined) {
    return null;
  }
  return (
    <IonList lines="full">
      <IonListHeader>Next race</IonListHeader>
      <IonItem button routerLink={`/race/${race.season}/${race.round}/${race.Circuit.Location.country}/${race.Circuit.circuitName}`}>
        <div slot="start" className="race-date ion-text-center">
          <strong>{new Date(race.date).getDate()}</strong><br/>
          <IonBadge color="medium" mode="ios">{new Date(race.date).toLocaleString('default', { month: 'short' })}</IonBadge>
        </div>
        <IonLabel>
          <h2 className="font-weight-bold">{race.Circuit.Location.country}</h2>
          <p>{race.raceName}</p>
        </IonLabel>
        <IonIcon slot="end" className="track-icon" src={`assets/img/tracks/${race.Circuit.circuitId}.svg`} />
      </IonItem>
    </IonList>
  );
};

export default RacePreview;