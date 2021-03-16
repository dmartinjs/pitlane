import React, { useEffect, useState } from 'react';
import {  } from '@ionic/react';
import { Lap } from '../../../models';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

const LapTimes: React.FC<{season: string, round: string, driverId: string}> = ({season, round, driverId}) => {
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/drivers/${driverId}/laps.json?limit=100`)
      .then(res => res.json())
      .then(result => setResults(getData(result.MRData.RaceTable.Races[0].Laps)));
  }, [season, round, driverId]);

  const getData = (positions: [Lap]) => {
    const data = positions.map(item => {
      return {
        lap: item.number,
        time: item.Timings[0].time,
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
    <AreaChart width={400} height={400} data={results}>
      <XAxis dataKey="lap" interval={8}/>
      <YAxis dataKey="time" hide={true} />
      <Area type="monotone" dataKey="time" stroke="#00d2be" fill="#00d2be" />
    </AreaChart>
  );
};

export default LapTimes;