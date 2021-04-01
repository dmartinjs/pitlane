import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { ConstructorStanding, DriverStanding } from '../../../models';
import './ConstructorStandings.css';

const ConstructorStandings: React.FC = () => {
  let history = useHistory();
  const [constructors, setConstructors] = useState<[ConstructorStanding] | null>(null);
  const [drivers, setDrivers] = useState<[DriverStanding] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then(res => res.json())
      .then(result => setDrivers(result.MRData.StandingsTable.StandingsLists[0].DriverStandings));

    fetch('https://ergast.com/api/f1/current/constructorStandings.json')
      .then(res => res.json())
      .then(result => setConstructors(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings));
  }, []);

  const _handleClick = (constructorId: string) => {
    history.push(`/constructor/${constructorId}`);
  }

  if (constructors === null || drivers === null) {
    return (
      <IonList lines="full">
        {[...Array(10)].map((item, index) =>
          <IonItem key={index}>
            <div className="standings-position ion-text-center font-weight-bold ion-margin-end">
              {index + 1}.
            </div>
            <div className="constructor-logo-loader ion-margin-end">&nbsp;</div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '80px' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '42px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      {constructors.map(constructor =>
        <IonItem button onClick={() => _handleClick(constructor.Constructor.constructorId)} key={constructor.Constructor.constructorId}>
          <div className="standings-position ion-text-center font-weight-bold ion-margin-end">
            {constructor.position}.
          </div>
          <IonIcon lazy className="constructor-logo ion-margin-end" src={`assets/img/constructors/${constructor.Constructor.constructorId}.svg`}/>
          <IonLabel>
            <h3 className="font-weight-bold ion-text-uppercase">{constructor.Constructor.name}</h3>
            <p>
            {drivers
              .filter(driver => driver.Constructors[0].constructorId === constructor.Constructor.constructorId)
              .slice(0, 2)
              .map<React.ReactNode>(driver => (
                driver.Driver.familyName 
              ))
              .reduce((prev, curr) => [prev, ' / ', curr])
            }
            </p>
          </IonLabel>
          <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{constructor.points}</IonBadge>
        </IonItem>
      )}
    </IonList>
  );
};

export default ConstructorStandings;