import React, { useEffect, useState } from 'react';
import { IonBadge, IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { Race } from '../../../models';
import './RaceResults.css';

const RaceResults: React.FC<{season?: string, round?: string}> = ({season, round}) => {
  const [results, setResults] = useState<[Race] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races));
  }, [season, round]);

  if (results === null) {
    return (
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div className="race-position ion-margin-end"></div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  else if (results.length <= 0) {
    return (
      <p>
        No race results yet
      </p>
    );
  }
  return (
    <IonList lines="full">
      <IonItem>
        <div className="race-position ion-text-center ion-margin-end">
          P
        </div>
        <IonLabel>
          Driver
        </IonLabel>
        <div className="race-time">
          Time / Ret
        </div>
        <div slot="end" className="race-points">
          Pts
        </div>
      </IonItem>
      {results[0].Results.map(result =>
        <IonItem key={result.position} className={result.FastestLap?.rank === '1' ? 'fastest-lap' : undefined}>
          <div className="race-position ion-margin-end ion-text-center font-weight-bold">
            {result.position}.
          </div>
          <IonLabel>
            <h3>{result.Driver.givenName} <strong className="ion-text-uppercase">{result.Driver.familyName}</strong></h3>
            <p>{result.Constructor.name}</p>
          </IonLabel>
          <IonBadge color="medium" mode="ios" className="race-time">{result.Time ? result.Time.time : (result.status.match(/\+[0-9]+ Lap/i) ? result.status : 'DNF')}</IonBadge>
          <div slot="end" className="race-points ion-text-right font-weight-bold">
            {result.points}
          </div>
        </IonItem>
      )}
    </IonList>
  );
};

export default RaceResults;