import React, { useEffect, useState } from 'react';
import { IonBadge, IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { Result } from '../models';

const RaceResults: React.FC<{season?: string, round?: string}> = ({season, round}) => {
  const [results, setResults] = useState<[Result] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races[0].Results));
  }, [season, round]);

  if (results === null) {
    return (
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div className="ion-margin-end">&nbsp;&nbsp;</div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      <IonItem>
        <div className="ion-margin-end">
          Pos
        </div>
        <IonLabel>
          Driver
        </IonLabel>
        <div>
          Time / Ret
        </div>
        <div slot="end">
          Pts
        </div>
      </IonItem>
      {results && results.map(result =>
        <IonItem key={result.position}>
          <div slot="start" className="font-weight-bold">
            {result.position}.
          </div>
          <IonLabel>
            <h3>{result.Driver.givenName} <strong className="ion-text-uppercase">{result.Driver.familyName}</strong></h3>
          </IonLabel>
          <IonBadge color="medium">{result.Time ? result.Time.time : (result.status === '+1 Lap' ? result.status : 'DNF')}</IonBadge>
          <div slot="end">
            {result.points}
          </div>
        </IonItem>
      )}
    </IonList>
  );
};

export default RaceResults;