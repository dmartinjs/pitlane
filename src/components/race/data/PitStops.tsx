import React, { useEffect, useState } from 'react';
import { IonBadge, IonItem, IonLabel, IonList } from '@ionic/react';
import { PitStop } from '../../../models';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const PitStops: React.FC<{season: string, round: string, driverId: string}> = ({season, round, driverId}) => {
  const [results, setResults] = useState<[PitStop] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/drivers/${driverId}/pitstops.json?limit=100`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races[0].PitStops));
  }, [season, round, driverId]);

  const getData = (pitstop: [PitStop]) => {
    const data = pitstop.map(item => {
      return {
        number: item.stop,
        time: Date.parse(`1970-01-01T00:00:${item.duration}Z`),
      }
    });
    return data;
  };

  if (results === null) {
    return (
      <div></div>
    );
  }
  return (
    <>
      <ResponsiveContainer height={400}>
        <BarChart width={400} height={400} data={getData(results)} maxBarSize={64}>
          <XAxis dataKey="number" tickLine={false}/>
          <YAxis dataKey="time" hide={true} />
          <Bar dataKey="time" fill="#e10600" radius={[8, 8, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
      <IonList lines="full">
        <IonItem>
          <div className="race-position ion-text-center ion-margin-end">
            Stops
          </div>
          <IonLabel>
            Driver
          </IonLabel>
          <div className="race-time" slot="end">
            Duration
          </div>
        </IonItem>
        {results.map(result =>
          <IonItem key={result.stop}>
            <div className="race-position ion-margin-end ion-text-center font-weight-bold">
              {result.stop}
            </div>
            <IonLabel>
              <h3 className="ion-text-uppercase font-weight-bold">{result.driverId}</h3>
            </IonLabel>
            <IonBadge color="medium" mode="ios" className="race-time">{result.duration}</IonBadge>
          </IonItem>
        )}
      </IonList>
    </>
  );
};

export default PitStops;