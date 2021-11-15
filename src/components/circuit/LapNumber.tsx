import React, { useEffect, useState } from 'react';
import {IonIcon, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { reloadOutline } from 'ionicons/icons';
import { Result } from '../../models';

const LapNumber: React.FC<{circuitId?: string}> = ({circuitId}) => {
  const [result, setResult] = useState<Result | undefined | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/circuits/${circuitId}/results/1.json?limit=100`)
      .then(res => res.json())
      .then(result => {
        if(result.MRData.RaceTable.Races.length > 0) {
          setResult(result.MRData.RaceTable.Races.pop().Results[0])
        } else {
          setResult(undefined)
        }
      })
  }, [circuitId]);

  if (result === null) {
    return (
      <IonItem lines="full">
        <IonIcon slot="start" icon={reloadOutline} />
        <IonLabel>
          <p>Lap Number</p>
          <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
        </IonLabel>
      </IonItem>
    );
  }
  return (
    <IonItem lines="full">
      <IonIcon slot="start" icon={reloadOutline} />
      <IonLabel>
        <p>Lap Number</p>
        <h2 className="font-weight-bold">{result === undefined ? 'Not Available' : result.laps}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default LapNumber;
