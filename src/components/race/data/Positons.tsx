import React, { useEffect, useState } from 'react';
import {  } from '@ionic/react';
import { Lap } from '../../../models';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

const Positions: React.FC<{season: string, round: string, driverId: string}> = ({season, round, driverId}) => {
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/laps.json?limit=1000`)
      .then(res => res.json())
      .then(result => setResults(getData(result.MRData.RaceTable.Races[0].Laps)));
  }, [season, round]);

  const getData = (positions: [Lap]) => {
    console.log(positions)
    const data = positions.map(item => {
      return {
        lapnumber: item.number,
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
    console.log(data);
    return data;
  };

  if (results === null) {
    return (
      <div></div>
    );
  }
  return (
    <LineChart width={400} height={500} data={results}>
      <XAxis dataKey="lapnumber" interval={8}/>
      <YAxis domain={[0, 22]} orientation="right" reversed={true} hide={true} />
      <Line type="monotone" dataKey="hamilton" stroke="#00d2be" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="bottas" stroke="#00d2be" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="max_verstappen" stroke="#1e41ff" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="albon" stroke="#1e41ff" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="leclerc" stroke="#dc0000" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="vettel" stroke="#dc0000" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="sainz" stroke="#ff8700" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="norris" stroke="#ff8700" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="perez" stroke="#f596c8" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="stroll" stroke="#f596c8" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="ricciardo" stroke="#fff500" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="ocon" stroke="#fff500" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="gasly" stroke="#469bff" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="kvyat" stroke="#469bff" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="raikkonen" stroke="#9b0000" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="giovinazzi" stroke="#9b0000" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="kevin_magnussen" stroke="#bd9e57" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="grosjean" stroke="#bd9e57" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="russell" stroke="#ffffff" dot={false} strokeWidth={2} />
      <Line type="monotone" dataKey="latifi" stroke="#ffffff" dot={false} strokeWidth={2} />
    </LineChart>
  );
};

export default Positions;