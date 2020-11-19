import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSkeletonText } from '@ionic/react';
import { Race } from '../models';

const RacePreview: React.FC = () => {
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/next.json')
      .then(res => res.json())
      .then(result => setRace(result.MRData.RaceTable.Races[0]));
  }, []);

  const raceDate = race && new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "short"}).format(new Date(race.date));

  if (race === null) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>
            <IonSkeletonText animated style={{ height: '10px', width: '30%' }}/>
          </IonCardSubtitle>
          <IonCardTitle>
            <IonSkeletonText animated style={{ height: '26px', width: '50%' }}/>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonSkeletonText animated style={{ height: '10px', width: '60%' }}/>
        </IonCardContent>
      </IonCard>
    );
  }
  return (
    <IonCard href={`/race/${race.season}/${race.round}/${race.Circuit.Location.country}`}>
      <IonCardHeader>
        <IonCardSubtitle>
          {raceDate}
        </IonCardSubtitle>
        <IonCardTitle>
          {race.Circuit.Location.country} {race.season}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {race.Circuit.circuitName}
      </IonCardContent>
    </IonCard>
  );
};

export default RacePreview;