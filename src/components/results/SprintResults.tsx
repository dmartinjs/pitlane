import React, { useEffect, useState } from 'react';
import { IonBadge, IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { SprintResult } from '../../models';

const SprintResults: React.FC<{season?: string, round?: string}> = ({season, round}) => {
  const [sprintResults, setSprintResults] = useState<[SprintResult] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/sprint.json`)
      .then(res => res.json())
      .then(result => setSprintResults(result.MRData.RaceTable.Races[0].SprintResults));
  }, [season, round]);

  if (sprintResults === null) {
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
      {sprintResults.map(sprint =>
        <IonItem key={sprint.position} className={sprint.FastestLap?.rank === '1' ? 'fastest-lap' : undefined}>
          <div className="race-position ion-margin-end ion-text-center font-weight-bold">
            {sprint.position}.
          </div>
          <IonLabel>
            <h3>{sprint.Driver.givenName} <strong className="ion-text-uppercase">{sprint.Driver.familyName}</strong></h3>
            <p>{sprint.Constructor.name}</p>
          </IonLabel>
          <IonBadge color="medium" mode="ios" className="race-time">{sprint.Time ? sprint.Time.time : 'DNF'}</IonBadge>
          <div slot="end" className="race-points ion-text-right font-weight-bold">
            {sprint.points}
          </div>
        </IonItem>
      )}
    </IonList>
  );
};

export default SprintResults;