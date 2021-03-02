import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { RaceResult, DriverStanding } from '../models';

const DriverResults: React.FC<{season?: string, driverId?: string}> = ({season, driverId}) => {
  const [results, setResults] = useState<[RaceResult] | null>(null);
  const [driver, setDriver] = useState<DriverStanding | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/drivers/${driverId}/results.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races));
    
    fetch(`https://ergast.com/api/f1/${season}/drivers/${driverId}/driverStandings.json`)
      .then(res => res.json())
      .then(result => setDriver(result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]));
  }, [season, driverId]);

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
    <IonList lines="full" className="driver-results-list">
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
        <div slot="end" className="race-points">
          Pts
        </div>
      </IonItem>
      {results && results.map(result =>
        <IonItem key={result.raceName}>
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
          {driver?.position}
        </div>
        <div slot="end" className="race-points">
          {driver?.points}
        </div>
      </IonItem>
    </IonList>
  );
};

export default DriverResults;