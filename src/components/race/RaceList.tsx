import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText, IonThumbnail, IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Race } from '../../models';

const RaceList: React.FC<{results?: boolean, season: string}> = ({results, season}) => {
  let history = useHistory();
  const [races, setRaces] = useState<[Race] | null>(null);

  useEffect(() => {
    if(parseInt(season) !== new Date().getFullYear()) {
      fetch(`https://ergast.com/api/f1/${season}.json`)
        .then(res => res.json())
        .then(result => setRaces(result.MRData.RaceTable.Races));
    } else {
      fetch('https://ergast.com/api/f1/current.json')
        .then(res => res.json())
        .then(result => setRaces(result.MRData.RaceTable.Races));
    }
  }, [season]);

  const racesFiltered = results ? races && races.filter(race => new Date(race.date) < new Date()).reverse() : races;

  const _handleClick = (season: string, round: string, country: string, circuit: string) => {
    if(results) {
      history.push(`/results/${season}/${round}/race`);
    } else {
      history.push(`/race/${season}/${round}/${country}/${circuit}`);
    }
  }

  if (racesFiltered === null) {
    return (
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div className="round-position ion-text-center font-weight-bold ion-margin-end">
              {index + 1}.
            </div>
            <div className="country-thumbnail ion-margin-end">&nbsp;</div>
            <IonLabel>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '70px' }}/></h2>
              <p><IonSkeletonText animated style={{ height: '11px', width: '120px' }}/></p>
            </IonLabel>
            <IonSkeletonText slot="end"  animated style={{ height: '16px', width: '24px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      {racesFiltered.map(race =>
        <IonItem button onClick={() => _handleClick(race.season, race.round, race.Circuit.Location.country, race.Circuit.circuitName)} key={race.round}>
          <div className="round-position ion-text-center font-weight-bold ion-margin-end">
            {race.round}.
          </div>
          <IonThumbnail className="country-thumbnail ion-margin-end">
            <IonImg src={`assets/img/flags/${race.Circuit.Location.country.replace(' ', '_')}.svg`} alt={race.Circuit.Location.country} />
          </IonThumbnail>
          <IonLabel>
            <h2 className="font-weight-bold">{race.Circuit.Location.country}</h2>
            <p>{race.raceName}</p>
          </IonLabel>
          <div slot="end" className="race-date ion-text-center">
            <strong>{new Date(race.date).getDate()}</strong><br/>
            <IonBadge color="medium" mode="ios">{new Date(race.date).toLocaleString('default', { month: 'short' })}</IonBadge>
          </div>
        </IonItem>
      )}
    </IonList>
  );
};

export default RaceList;