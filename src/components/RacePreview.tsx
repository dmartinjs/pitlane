import React, { useEffect, useState } from 'react';
import { IonCard, IonSkeletonText, IonItem, IonAvatar, IonLabel, IonBadge } from '@ionic/react';
import { Race } from '../models';

const RacePreview: React.FC = () => {
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/next.json')
      .then(res => res.json())
      .then(result => {
        if(result.length > 0) {
          setRace(result.MRData.RaceTable.Races[0]);
        } else {
          fetch('https://ergast.com/api/f1/current/last.json')
            .then(res => res.json())
            .then(result => setRace(result.MRData.RaceTable.Races[0]));
        }
      });
  }, [race]);

  if (race === null) {
    return (
      <IonCard>
        <IonItem>
          <IonAvatar slot="start">
            &nbsp;
          </IonAvatar>
          <IonLabel>
            <h2><IonSkeletonText animated style={{ height: '11px', width: '70px' }}/></h2>
            <h3><IonSkeletonText animated style={{ height: '11px', width: '55px' }}/></h3>
            <p><IonSkeletonText animated style={{ height: '11px', width: '120px' }}/></p>
          </IonLabel>
        </IonItem>
      </IonCard>
    );
  }
  return (
    <IonCard href={`/race/${race.season}/${race.round}/${race.Circuit.Location.country}`}>
      <IonItem button>
        <IonAvatar slot="start">
          <img src={`/assets/img/flags/${race.Circuit.Location.country}.svg`} alt={race.Circuit.Location.country}/>
        </IonAvatar>
        <IonLabel>
          <p className="ion-text-uppercase text-primary">ROUND {race.round}</p>
          <h2><strong>{race.Circuit.Location.country}</strong></h2>
          <p>{race.raceName}</p>
        </IonLabel>
        <div slot="end" className="ion-text-center">
          {new Date(race.date).getDate()}<br/>
          <IonBadge color="medium">{new Date(race.date).toLocaleString('default', { month: 'short' })}</IonBadge>
        </div>
      </IonItem>
    </IonCard>
  );
};

export default RacePreview;