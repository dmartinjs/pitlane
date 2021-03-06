import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { DriverStanding } from '../../models';

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
            <div className="ion-margin-start ion-margin-end">
              &nbsp;
            </div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '80px' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '42px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      {drivers.map(driver =>
        <IonItem button onClick={() => _handleClick(driver.Driver.driverId)} key={driver.Driver.driverId}>
          <div className="standings-position font-weight-bold ion-margin-end">
            {driver.position}.
          </div>
          <IonIcon lazy className="constructor-logo ion-margin-end" src={`assets/img/constructors/${driver.Constructors[0].constructorId}.svg`}/>
          <IonLabel>
            <h3>{driver.Driver.givenName} <strong className="ion-text-uppercase">{driver.Driver.familyName}</strong></h3>
            <p>{driver.Constructors[0].name}</p>
          </IonLabel>
          <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{driver.points}</IonBadge>
        </IonItem>
      )}
    </IonList>
  );
};

export default DriverStandings;