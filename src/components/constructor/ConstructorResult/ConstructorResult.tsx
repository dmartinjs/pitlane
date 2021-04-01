import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { ConstructorStanding } from '../../../models';
import '../ConstructorResults.css';

const ConstructorResult: React.FC<{season: string, round: string, constructorId?: string, country: string, date: Date}> = ({season, round, constructorId, country, date}) => {
  const [constructor, setConstructor] = useState<ConstructorStanding | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/constructors/${constructorId}/constructorStandings.json`)
      .then(res => res.json())
      .then(result => setConstructor(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]));
  }, [season, round, constructorId]);

  if (constructor === null) {
    return (
      <IonItem>
        <div className="race-position ion-margin-end"></div>
        <IonLabel>
          <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
        </IonLabel>
        <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
      </IonItem>
    );
  }
  return (
    <IonItem button routerLink={`/results/${season}/${round}/race`}>
      <div className="driver-race ion-margin-end font-weight-bold">
        {country}
      </div>
      <IonLabel className="driver-date">
        {new Date(date).toLocaleString('default', {day: 'numeric', month: 'numeric' })}
      </IonLabel>
      <div className="driver-position ion-margin-end font-weight-bold">
        {constructor.position}
      </div>
      <div slot="end" className="race-points ion-text-right">
        {constructor.points}
      </div>
    </IonItem>
  );
};

export default ConstructorResult;