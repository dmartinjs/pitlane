import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';
import { Race } from '../models';

const RaceList: React.FC<{past?: boolean}> = ({past}) => {
  const [races, setRaces] = useState<[Race] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current.json')
      .then(res => res.json())
      .then(result => setRaces(result.MRData.RaceTable.Races));
  }, []);

  const racesFiltered = past ? races && races.filter(race => new Date(race.date) < new Date()) : races && races.filter(race => new Date(race.date) > new Date());

  if (races === null) {
    return (
      <IonList>
        {[...Array(6)].map(() =>
          <IonItem>
            <IonLabel style={{ marginLeft: '66px'}}>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '25%' }}></IonSkeletonText></h2>
              <h3><IonSkeletonText animated style={{ height: '11px', width: '15%' }}></IonSkeletonText></h3>
              <p><IonSkeletonText animated style={{ height: '11px', width: '55%' }}></IonSkeletonText></p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      {racesFiltered && racesFiltered.map(race =>
        <IonItem button>
        <div slot="start" className="ion-text-center">
          {new Date(race.date).getDate()}<br/>
          <IonBadge color="medium">{new Date(race.date).toLocaleString('default', { month: 'short' })}</IonBadge>
        </div>
        <IonLabel>
          <p className="ion-text-uppercase text-primary">ROUND {race.round}</p>
          <h2><strong>{race.Circuit.Location.country}</strong></h2>
          <p>{race.raceName}</p>
        </IonLabel>
      </IonItem>
      )}
    </IonList>
  );
};

export default RaceList;