import React, { useEffect, useState } from 'react';
import { IonBadge, IonCol, IonGrid, IonRow, IonSkeletonText } from '@ionic/react';
import { QualifyingResult } from '../models';

const QualifyingResults: React.FC<{season?: string, round?: string}> = ({season, round}) => {
  const [results, setResults] = useState<[QualifyingResult] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/qualifying.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races[0].QualifyingResults));
  }, [season, round]);

  if (results === null) {
    return (
      <IonGrid>
        {[...Array(20)].map((item, index) =>
          <IonRow key={index}>
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
        <IonCol>
          Q1
        </IonCol>
        <IonCol>
          Q2
        </IonCol>
        <IonCol>
          Q3
        </IonCol>
      </IonRow>
      {results && results.map(result =>
        <IonRow key={result.position}>
          <IonCol size="2">
            <strong>{result.position}</strong>
          </IonCol>
          <IonCol>
            <strong className="ion-text-uppercase">{result.Driver.code}</strong>
          </IonCol>
          <IonCol>
            <IonBadge color="medium">{result.Q1}</IonBadge>
          </IonCol>
          <IonCol>
            {result.Q2 !== undefined ? <IonBadge color="medium">{result.Q2}</IonBadge> : '--'}
          </IonCol>
          <IonCol>
            {result.Q3 !== undefined ? <IonBadge color="medium">{result.Q3}</IonBadge> : '--'}
          </IonCol>
        </IonRow>
      )}
    </IonGrid>
  );
};

export default QualifyingResults;