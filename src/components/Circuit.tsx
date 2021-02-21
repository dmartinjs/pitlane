import React, { useEffect, useState } from 'react';
import { IonSkeletonText, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { Race } from '../models';

const Circuit: React.FC<{season: string, round: string, circuit: string}> = ({season, round, circuit}) => {
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}.json`)
      .then(res => res.json())
      .then(result => {
        setRace(result.MRData.RaceTable.Races[0]);
      });
  }, [round, season]);

  if (race === null) {
    return (
      <IonItem>
        <IonAvatar slot="start">
          &nbsp;
        </IonAvatar>
        <IonLabel>
          <h2><IonSkeletonText animated style={{ height: '11px', width: '70px' }}/></h2>
          <p><IonSkeletonText animated style={{ height: '11px', width: '120px' }}/></p>
        </IonLabel>
      </IonItem>
    );
  }
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={`assets/img/flags/${race.Circuit.Location.country}.svg`} alt={race.Circuit.Location.country}/>
      </IonAvatar>
      <IonLabel>
        <h2><strong>{race.Circuit.Location.country}</strong> {season}</h2>
        <p>{race.Circuit.circuitName}</p>
      </IonLabel>
    </IonItem>
  );
};

export default Circuit;