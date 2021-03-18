import React, { useEffect, useState } from 'react';
import {  } from '@ionic/react';
import { Lap } from '../../../models';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Positions: React.FC<{season: string, round: string, driverId: string}> = ({season, round, driverId}) => {
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/laps.json?limit=1000`)
      .then(res => res.json())
      .then(result => setResults(getData(result.MRData.RaceTable.Races[0].Laps)));
  }, [season, round]);

  const getData = (positions: [Lap]) => {
    let lap: any;

    const data = positions.map(item => {
      lap = {};
      lap['lap'] = item.number;
      item.Timings.forEach(item => lap[item.driverId] = item.position)
      return lap;
    });
    return data;
  };

  if (results === null) {
    return (
      <div></div>
    );
  }
  return (
    <ResponsiveContainer height={400}>
      <LineChart width={400} height={450} data={results}>
        <CartesianGrid horizontal={false} stroke="var(--ion-border-color)"/>
        <XAxis dataKey="lap" interval={8} tickLine={false}/>
        <YAxis domain={[0, 20]} orientation="right" reversed={true} hide={true} />
        <Line type="monotone" dataKey="hamilton" stroke="#00D2BE" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="bottas" stroke="#00D2BE" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="max_verstappen" stroke="#1E41FF" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="albon" stroke="#1E41FF" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="leclerc" stroke="#DC0000" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="vettel" stroke="#DC0000" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="sainz" stroke="#FF8700" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="norris" stroke="#FF8700" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="perez" stroke="#F596C8" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="stroll" stroke="#F596C8" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="ricciardo" stroke="#FFF500" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="ocon" stroke="#FFF500" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="gasly" stroke="#FFFFFF" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="kvyat" stroke="#FFFFFF" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="raikkonen" stroke="#9B0000" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="giovinazzi" stroke="#9B0000" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="kevin_magnussen" stroke="#787878" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="grosjean" stroke="#787878" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="russell" stroke="#0082fa" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="latifi" stroke="#0082fa" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Positions;