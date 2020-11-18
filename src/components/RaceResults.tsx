import React, { useEffect, useState } from 'react';
import { IonBadge, IonCol, IonGrid, IonRow, IonSkeletonText } from '@ionic/react';
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
      <IonGrid>
        {[...Array(20)].map(() =>
          <IonRow>
            <IonCol>
              <IonSkeletonText animated style={{ height: '16px', width: '100%' }}/>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    );
  }
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="2">POS</IonCol>
        <IonCol>
          DRIVER
        </IonCol>
        <IonCol class="ion-text-center">
          TIME/RET
        </IonCol>
        <IonCol class="ion-text-center">
          PTS
        </IonCol>
      </IonRow>
      {results && results.map(result =>
        <IonRow>
          <IonCol size="2">
            <strong>{result.position}</strong>
          </IonCol>
          <IonCol>
            <strong className="ion-text-uppercase">{result.Driver.code}</strong>
          </IonCol>
          <IonCol class="ion-text-center">
            <IonBadge color="medium">{result.Time ? result.Time.time : 'DNF'}</IonBadge>
          </IonCol>
          <IonCol class="ion-text-center">
            <strong>{result.points}</strong>
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  );
};

export default RaceResults;