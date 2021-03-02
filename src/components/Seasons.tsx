import React, { useEffect, useState } from 'react';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { Season } from '../models';
import DriverResults from './DriverResults';

const Seasons: React.FC<{driverId?: string}> = ({driverId}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('2020');
  const [seasons, setSeasons] = useState<[Season] | null>(null);

  const onChange = (event: CustomEvent) => SetSelectedSegment(event.detail.value);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/drivers/${driverId}/seasons.json`)
      .then(res => res.json())
      .then(result => setSeasons(result.MRData.SeasonTable.Seasons.reverse()));
  }, [driverId]);

  return (
    <>
      <IonSegment className="seasons-segment" onIonChange={onChange} value={selectedSegment} scrollable>
        {seasons?.map((season, index) =>
          <IonSegmentButton key={season.season} value={season.season}>
            <IonLabel>{season.season}</IonLabel>
          </IonSegmentButton>
        )}
      </IonSegment>
      <DriverResults season={selectedSegment} driverId={driverId} />
    </>
  );
};

export default Seasons;