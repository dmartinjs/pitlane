import React, { useEffect, useState } from 'react';
import { IonBadge, IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
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
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div className="quali-position ion-margin-end"></div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
            <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      <IonItem>
        <div className="quali-position ion-margin-end">
          P
        </div>
        <IonLabel>
          Driver
        </IonLabel>
        <div slot="end" className="quali-results d-flex">
          <div className="quali-title ion-margin-end">Q1</div>
          <div className="quali-title ion-margin-end">Q2</div>
          <div className="quali-title">Q3</div>
        </div>
      </IonItem>
      {results && results.map(result =>
        <IonItem key={result.position}>
          <div className="quali-position ion-margin-end font-weight-bold">
            {result.position}.
          </div>
          <IonLabel>
            <h3 className="font-weight-bold ion-text-uppercase">{result.Driver.familyName}</h3>
          </IonLabel>
          <div slot="end" className="quali-results">
            <IonBadge color="medium" className="ion-margin-end">{result.Q1}</IonBadge>
            {result.Q2 !== undefined ? <IonBadge color="medium" className="ion-margin-end">{result.Q2}</IonBadge> : ''}
            {result.Q3 !== undefined ? <IonBadge color="medium">{result.Q3}</IonBadge> : ''}
          </div>
        </IonItem>
      )}
    </IonList>
  );
};

export default QualifyingResults;