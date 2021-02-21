import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { DriverStanding } from '../models';

const DriverStandings: React.FC = () => {
  let history = useHistory();
  const [drivers, setDrivers] = useState<[DriverStanding] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then(res => res.json())
      .then(result => setDrivers(result.MRData.StandingsTable.StandingsLists[0].DriverStandings));
  }, []);

  const _handleClick = (driverId: string) => {
    history.push(`/driver/${driverId}`);
  }

  if (drivers === null) {
    return (
      <IonList>
        {[...Array(20)].map((item, index) =>
          <IonItem detail key={index}>
            <div slot="start">&nbsp;&nbsp;</div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '80px' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" className="ion-margin-end" animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      {drivers.map(driver =>
        <IonItem button detail onClick={() => _handleClick(driver.Driver.driverId)} key={driver.Driver.driverId}>
          <div slot="start" className="font-weight-bold">
            {driver.position}
          </div>
          <IonLabel>
            <h3>{driver.Driver.givenName} <strong className="ion-text-uppercase">{driver.Driver.familyName}</strong></h3>
            <p>{driver.Constructors[0].name}</p>
          </IonLabel>
          <IonBadge slot="end" color="medium" className="ion-margin-end">{driver.points} PTS</IonBadge>
        </IonItem>
      )}
    </IonList>
  );
};

export default DriverStandings;