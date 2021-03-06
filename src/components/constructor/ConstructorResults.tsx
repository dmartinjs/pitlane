import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { RaceResult, ConstructorStanding } from '../../models';

const ConstructorResults: React.FC<{season?: string, constructorId?: string}> = ({season, constructorId}) => {
  const [results, setResults] = useState<[RaceResult] | null>(null);
  const [constructor, setConstructor] = useState<ConstructorStanding | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/constructors/${constructorId}/results.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races));
    
    fetch(`https://ergast.com/api/f1/${season}/constructors/${constructorId}/constructorStandings.json`)
      .then(res => res.json())
      .then(result => setConstructor(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]));
  }, [season, constructorId]);

  if (results === null) {
    return (
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div className="race-position ion-margin-end"></div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full" className="constructor-results-list">
      <IonItem>
        <div className="driver-race ion-margin-end">
          Race
        </div>
        <IonLabel className="driver-date">
          Date
        </IonLabel>
        <div className="driver-position ion-margin-end">
          Pos
        </div>
        <div slot="end" className="race-points ion-text-right">
          Pts
        </div>
      </IonItem>
      {results && results.map(result =>
        <IonItem key={result.raceName} button routerLink={`/results/${result.season}/${result.round}/race`}>
          <div className="driver-race ion-margin-end font-weight-bold">
            {result.Circuit.Location.country}
          </div>
          <IonLabel className="driver-date">
            {new Date(result.date).toLocaleString('default', {day: 'numeric', month: 'numeric' })}
          </IonLabel>
          <div className="driver-position ion-margin-end font-weight-bold">
            {result.Results[0].position}
          </div>
          <div slot="end" className="race-points ion-text-right">
            {result.Results[0].points}
          </div>
        </IonItem>
      )}
      <IonItem className="driver-standings">
        <div className="driver-race ion-margin-end font-weight-bold">
          Standings
        </div>
        <IonLabel className="driver-date">
          -
        </IonLabel>
        <div className="driver-position ion-margin-end font-weight-bold">
          {constructor?.position}
        </div>
        <div slot="end" className="race-points ion-text-right">
          {constructor?.points}
        </div>
      </IonItem>
    </IonList>
  );
};

export default ConstructorResults;