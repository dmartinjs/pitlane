import React, { useEffect, useState } from 'react';
import {IonIcon, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';

const DriverSeasons: React.FC<{driverId?: string}> = ({driverId}) => {
  const [seasons, setSeasons] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/drivers/${driverId}/seasons.json`)
        .then(res => res.json())
        .then(result => {
          setSeasons(result.MRData.total);
        });
  }, [driverId]);

  if (seasons === null) {
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
      <IonIcon slot="start" className="ion-margin-end" icon={calendarOutline}/>
      <IonLabel>
        <p>Seasons</p>
        <h2 className="font-weight-bold">{seasons}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default DriverSeasons;
