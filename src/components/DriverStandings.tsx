import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';
import { DriverStanding } from '../models';

const DriverStandings: React.FC = () => {
  const [drivers, setDrivers] = useState<[DriverStanding] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then(res => res.json())
      .then(result => setDrivers(result.MRData.StandingsTable.StandingsLists[0].DriverStandings));
  }, []);

  if (drivers === null) {
    return (
      <IonList>
        {[...Array(20)].map(() =>
          <IonItem>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '36px', width: '100%' }}/>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      {drivers.map(driver =>
        <IonItem button>
          <div slot="start" className="on-align-items-center">
            {driver.position}
          </div>
          <IonLabel>
            <h3>{driver.Driver.givenName} <strong className="ion-text-uppercase">{driver.Driver.familyName}</strong></h3>
            <p>{driver.Constructors[0].name}</p>
          </IonLabel>
          <IonBadge color="medium" slot="end">{driver.points} PTS</IonBadge>
        </IonItem>
      )}
    </IonList>
  );
};

export default DriverStandings;