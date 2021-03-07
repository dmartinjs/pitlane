import React, { useEffect, useState } from 'react';
import {IonBadge, IonIcon, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { stopwatchOutline } from 'ionicons/icons';
import { RaceResult } from '../../models';

const LapRecord: React.FC<{circuitId?: string}> = ({circuitId}) => {
  const [result, setResult] = useState<RaceResult | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/circuits/${circuitId}/fastest/1/results.json`)
      .then(res => res.json())
      .then(result => setResult(result.MRData.RaceTable.Races.pop()));
  }, [circuitId]);

  if (result === null) {
    return (
      <IonItem lines="full">
        <IonLabel>
          <p>Lap Record</p>
          <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
        </IonLabel>
      </IonItem>
    );
  }
  return (
    <IonItem lines="full">
      <IonIcon slot="start" icon={stopwatchOutline} />
      <IonLabel>
        <p>Lap Record</p>
        <h2 className="font-weight-bold">{result.Results[0].Driver.givenName} {result.Results[0].Driver.familyName} ({result.season})</h2>
      </IonLabel>
      <IonBadge color="medium" mode="ios">{result.Results[0].FastestLap.Time.time}</IonBadge>
    </IonItem>
  );
};

export default LapRecord;
