import React, { useEffect, useState } from 'react';
import {  } from '@ionic/react';
import { Lap } from '../../../models';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Positions: React.FC<{season: string, round: string, driverId: string}> = ({season, round, driverId}) => {
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/laps.json?limit=1000`)
      .then(res => res.json())
      .then(result => setResults(getData(result.MRData.RaceTable.Races[0].Laps)));
  }, [season, round]);

  const getData = (positions: [Lap]) => {
    const data = positions.map(item => {
      return {
        lap: item.number,
        [item.Timings[0].driverId]: item.Timings[0].position,
        [item.Timings[1].driverId]: item.Timings[1].position,
        [item.Timings[2].driverId]: item.Timings[2].position,
        [item.Timings[3].driverId]: item.Timings[3].position,
        [item.Timings[4].driverId]: item.Timings[4].position,
        [item.Timings[5].driverId]: item.Timings[5].position,
        [item.Timings[6].driverId]: item.Timings[6].position,
        [item.Timings[7].driverId]: item.Timings[7].position,
        [item.Timings[8].driverId]: item.Timings[8].position,
        [item.Timings[9].driverId]: item.Timings[9].position,
        [item.Timings[10].driverId]: item.Timings[10].position,
        [item.Timings[11].driverId]: item.Timings[11].position,
        [item.Timings[12].driverId]: item.Timings[12].position,
        [item.Timings[13].driverId]: item.Timings[13].position,
        [item.Timings[14].driverId]: item.Timings[14].position,
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
    <ResponsiveContainer height={400}>
      <LineChart width={400} height={500} data={results}>
        <XAxis dataKey="lap" interval={8}/>
        <YAxis domain={[0, 22]} orientation="right" reversed={true} hide={true} />
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