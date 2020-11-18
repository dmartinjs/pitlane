import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { ConstructorStanding } from '../models';

const ConstructorStandings: React.FC = () => {
  let history = useHistory();
  const [constructors, setConstructors] = useState<[ConstructorStanding] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/constructorStandings.json')
      .then(res => res.json())
      .then(result => setConstructors(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings));
  }, []);

  const _handleClick = (constructorId: string) => {
    history.push(`/constructor/${constructorId}`);
  }

  if (constructors === null) {
    return (
      <IonList>
        {[...Array(8)].map((index) =>
          <IonItem key={index}>
            <div slot="start">&nbsp;&nbsp;</div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '40%' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '30%' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      {constructors.map(constructor =>
        <IonItem button onClick={() => _handleClick(constructor.Constructor.constructorId)} key={constructor.Constructor.constructorId}>
        <div slot="start">
          {constructor.position}
        </div>
        <IonLabel>
          <h3>{constructor.Constructor.name}</h3>
          <p>{constructor.Constructor.nationality}</p>
        </IonLabel>
        <IonBadge color="medium" slot="end">{constructor.points} PTS</IonBadge>
      </IonItem>
      )}
    </IonList>
  );
};

export default ConstructorStandings;