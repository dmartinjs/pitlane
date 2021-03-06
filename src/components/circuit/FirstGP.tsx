import React, { useEffect, useState } from 'react';
import {IonIcon, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { todayOutline } from 'ionicons/icons';
import { Race } from '../../models';

const FirstGP: React.FC<{circuitId?: string}> = ({circuitId}) => {
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/circuits/${circuitId}/races.json`)
      .then(res => res.json())
      .then(result => setRace(result.MRData.RaceTable.Races[0]));
  }, [circuitId]);

  if (race === null) {
    return (
      <IonItem lines="full">
        <IonLabel>
          <p>&nbsp;</p>
          <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
        </IonLabel>
      </IonItem>
    );
  }
  return (
    <IonItem lines="full">
      <IonIcon slot="start" icon={todayOutline} />
      <IonLabel>
        <p>First Grand Prix</p>
        <h2>{race.season}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default FirstGP;
