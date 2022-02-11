import React, { useEffect, useState } from 'react';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { Season } from '../models';
import DriverResults from './driver/DriverResults';
import ConstructorResults from './constructor/ConstructorResults';

const Seasons: React.FC<{driverId?: string, constructorId?: string}> = ({driverId, constructorId}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>(`${new Date().getFullYear()}`);
  const [seasons, setSeasons] = useState<[Season] | null>(null);

  const onChange = (event: CustomEvent) => setSelectedSegment(event.detail.value);

  useEffect(() => {
    if(driverId !== undefined) {
      fetch(`https://ergast.com/api/f1/drivers/${driverId}/seasons.json`)
        .then(res => res.json())
        .then(result => {
          if(result.MRData.SeasonTable.Seasons[result.MRData.SeasonTable.Seasons.length - 1].season !== new Date().getFullYear()) {
            setSelectedSegment(result.MRData.SeasonTable.Seasons[result.MRData.SeasonTable.Seasons.length - 1].season);
          }
          setSeasons(result.MRData.SeasonTable.Seasons.reverse());
        });
    }

    if(constructorId !== undefined) {
      fetch(`https://ergast.com/api/f1/constructors/${constructorId}/seasons.json?limit=100`)
        .then(res => res.json())
        .then(result => {
          if(result.MRData.SeasonTable.Seasons[result.MRData.SeasonTable.Seasons.length - 1].season !== new Date().getFullYear()) {
            setSelectedSegment(result.MRData.SeasonTable.Seasons[result.MRData.SeasonTable.Seasons.length - 1].season);
          }
          setSeasons(result.MRData.SeasonTable.Seasons.reverse())
        });
    }
  }, [driverId, constructorId]);

  return (
    <>
      <IonSegment className="seasons-segment" onIonChange={onChange} value={selectedSegment} scrollable>
        {seasons?.map(season =>
          <IonSegmentButton key={season.season} value={season.season}>
            <IonLabel>{season.season}</IonLabel>
          </IonSegmentButton>
        )}
      </IonSegment>
      {driverId !== undefined && <DriverResults season={selectedSegment} driverId={driverId} />}
      {constructorId !== undefined && <ConstructorResults season={selectedSegment} constructorId={constructorId} />}
    </>
  );
};

export default Seasons;