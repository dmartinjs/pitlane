import React, { useEffect, useState } from 'react';
import {IonIcon, IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { Race } from '../../models';
import { flagOutline, podiumOutline, stopwatchOutline, trophyOutline } from 'ionicons/icons';

const DriverAchievements: React.FC<{driverId?: string}> = ({driverId}) => {
  const [races, setRaces] = useState<number | null>(null);
  const [podiums, setPodiums] = useState<number | null>(null);
  const [victories, setVictories] = useState<number | null>(null);
  const [polePositions, setpolePositions] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/drivers/${driverId}/results.json?limit=300`)
        .then(res => res.json())
        .then(result => {
          setRaces(result.MRData.total);
          setPodiums(result.MRData.RaceTable.Races.filter((race: Race) => parseInt(race.Results[0].position) <= 3).length);
          setVictories(result.MRData.RaceTable.Races.filter((race: Race) => parseInt(race.Results[0].position) === 1).length);
          setpolePositions(result.MRData.RaceTable.Races.filter((race: Race) => parseInt(race.Results[0].grid) === 1).length);
        });
  }, [driverId]);

  if (races === null) {
    return (
      <>
        <IonItem lines="full">
          <IonLabel>
            <p>&nbsp;</p>
            <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
          </IonLabel>
        </IonItem>
        <IonItem lines="full">
          <IonLabel>
            <p>&nbsp;</p>
            <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
          </IonLabel>
        </IonItem>
        <IonItem lines="full">
          <IonLabel>
            <p>&nbsp;</p>
            <IonSkeletonText animated style={{ height: '11px', width: '70px' }}/>
          </IonLabel>
        </IonItem>
      </>
    );
  }
  return (
    <>
      <IonItem lines="full">
        <IonIcon slot="start" className="ion-margin-end" icon={flagOutline}/>
        <IonLabel>
          <p>Races</p>
          <h2 className="font-weight-bold">{races}</h2>
        </IonLabel>
      </IonItem>
      <IonItem lines="full">
        <IonIcon slot="start" className="ion-margin-end" icon={podiumOutline}/>
        <IonLabel>
          <p>Podiums</p>
          <h2 className="font-weight-bold">{podiums}</h2>
        </IonLabel>
      </IonItem>
      <IonItem lines="full">
        <IonIcon slot="start" className="ion-margin-end" icon={trophyOutline}/>
        <IonLabel>
          <p>Victories</p>
          <h2 className="font-weight-bold">{victories}</h2>
        </IonLabel>
      </IonItem>
      <IonItem lines="full">
        <IonIcon slot="start" className="ion-margin-end" icon={stopwatchOutline}/>
        <IonLabel>
          <p>Pole positions</p>
          <h2 className="font-weight-bold">{polePositions}</h2>
        </IonLabel>
      </IonItem>
    </>
  );
};

export default DriverAchievements;
