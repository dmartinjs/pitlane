import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText, IonAvatar, IonImg } from '@ionic/react';
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
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div>&nbsp;&nbsp;</div>
            <IonAvatar className="ion-margin-start ion-margin-end">
              &nbsp;
            </IonAvatar>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '80px' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      {drivers.map(driver =>
        <IonItem button onClick={() => _handleClick(driver.Driver.driverId)} key={driver.Driver.driverId}>
          <div className="font-weight-bold">
            {driver.position}.
          </div>
          <IonAvatar className="constructor-logo ion-margin-start ion-margin-end">
            <IonImg src={`assets/img/constructors/${driver.Constructors[0].constructorId}.svg`} alt={driver.Constructors[0].name} />
          </IonAvatar>
          <IonLabel>
            <h3>{driver.Driver.givenName} <strong className="ion-text-uppercase">{driver.Driver.familyName}</strong></h3>
            <p>{driver.Constructors[0].name}</p>
          </IonLabel>
          <IonBadge slot="end" color="medium">{driver.points} PTS</IonBadge>
        </IonItem>
      )}
    </IonList>
  );
};

export default DriverStandings;