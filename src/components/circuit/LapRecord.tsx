import React, { useEffect, useState } from 'react';
import {IonBadge, IonIcon, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { stopwatchOutline } from 'ionicons/icons';
import { RaceResult } from '../../models';

const LapRecord: React.FC<{circuitId?: string}> = ({circuitId}) => {
  const [result, setResult] = useState<RaceResult | undefined | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/circuits/${circuitId}/fastest/1/results.json`)
      .then(res => res.json())
      .then(result => {
        if(result.MRData.RaceTable.Races.length > 0) {
          setResult(result.MRData.RaceTable.Races.reduce((prev: RaceResult, curr: RaceResult) => prev.Results[0].FastestLap.Time.time < curr.Results[0].FastestLap.Time.time ? prev : curr))
        } else {
          setResult(undefined)
        }
      });
  }, [circuitId]);

  if (result === null) {
    return (
      <IonItem lines="full">
        <IonIcon slot="start" className="ion-margin-end" icon={stopwatchOutline} />
        <IonLabel>
          <p>Lap Record</p>
          <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
        </IonLabel>
      </IonItem>
    );
  }
  return (
    <IonItem lines="full">
      <IonIcon slot="start" className="ion-margin-end" icon={stopwatchOutline} />
      <IonLabel>
        <p>Lap Record</p>
        <h2 className="font-weight-bold">{result === undefined ? 'Not Available' : `${result.Results[0].Driver.givenName} ${result.Results[0].Driver.familyName} (${result.season})`}</h2>
      </IonLabel>
      {result !== undefined && <IonBadge color="medium" mode="ios">{result.Results[0].FastestLap.Time.time}</IonBadge>}
    </IonItem>
  );
};

export default LapRecord;
