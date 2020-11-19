import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { Race } from '../models';

const RaceList: React.FC<{past?: boolean, results?: boolean}> = ({past, results}) => {
  let history = useHistory();
  const [races, setRaces] = useState<[Race] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current.json')
      .then(res => res.json())
      .then(result => setRaces(result.MRData.RaceTable.Races));
  }, []);

  const racesFiltered = past ? races && races.filter(race => new Date(race.date) < new Date()).reverse() : races && races.filter(race => new Date(race.date) > new Date());

  const _handleClick = (season: string, round: string, country: string) => {
    if(results) {
      history.push(`/results/${season}/${round}`);
    } else {
      history.push(`/race/${season}/${round}/${country}`);
    }
  }

  if (races === null) {
    return (
      <IonList>
        {[...Array(6)].map(() =>
          <IonItem>
            <div slot="start" style={{ width: '32px'}}>
              &nbsp;
            </div>
            <IonLabel>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '25%' }}/></h2>
              <h3><IonSkeletonText animated style={{ height: '11px', width: '15%' }}/></h3>
              <p><IonSkeletonText animated style={{ height: '11px', width: '55%' }}/></p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      {racesFiltered && racesFiltered.map(race =>
        <IonItem button onClick={() => _handleClick(race.season, race.round, race.Circuit.Location.country)}>
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