import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { ConstructorStanding, DriverStanding } from '../models';

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
      <IonList>
        {[...Array(10)].map((item, index) =>
          <IonItem detail key={index}>
            <div slot="start">&nbsp;&nbsp;</div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '80px' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" className="ion-margin-end" animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      {constructors.map(constructor =>
        <IonItem button detail onClick={() => _handleClick(constructor.Constructor.constructorId)} key={constructor.Constructor.constructorId}>
        <div slot="start" className="font-weight-bold">
          {constructor.position}
        </div>
        <IonLabel>
          <h3 className="font-weight-bold ion-text-uppercase">{constructor.Constructor.name}</h3>
          <p>
          {drivers && drivers
            .filter(driver => driver.Constructors[0].constructorId === constructor.Constructor.constructorId)
            .slice(0, 2)
            .map<React.ReactNode>(driver => (
              driver.Driver.familyName 
            ))
            .reduce((prev, curr) => [prev, ' / ', curr])
          }
          </p>
        </IonLabel>
        <IonBadge slot="end" color="medium" className="ion-margin-end">{constructor.points} PTS</IonBadge>
      </IonItem>
      )}
    </IonList>
  );
};

export default ConstructorStandings;