import React, { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonSkeletonText } from '@ionic/react';
import { Race } from '../../models';
import { flagOutline, podiumOutline, stopwatchOutline, trophyOutline } from 'ionicons/icons';

const DriverAchievements: React.FC<{ driverId?: string }> = ({ driverId }) => {
  const [races, setRaces] = useState<number | null>(null);
  const [podiums, setPodiums] = useState<number | null>(null);
  const [wins, setWins] = useState<number | null>(null);
  const [polePositions, setpolePositions] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/drivers/${driverId}/results.json?limit=300`)
      .then(res => res.json())
      .then(result => {
        setRaces(result.MRData.total);
        setPodiums(result.MRData.RaceTable.Races.filter((race: Race) => parseInt(race.Results[0].position) <= 3).length);
        setWins(result.MRData.RaceTable.Races.filter((race: Race) => parseInt(race.Results[0].position) === 1).length);
        setpolePositions(result.MRData.RaceTable.Races.filter((race: Race) => parseInt(race.Results[0].grid) === 1).length);
      });
  }, [driverId]);

  if (races === null) {
    return (
      <IonList lines="full">
        <IonListHeader>&nbsp;</IonListHeader>
        <IonItem>
          <IonLabel>
            <p>&nbsp;</p>
            <IonSkeletonText animated style={{ height: '11px', width: '70px' }} />
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>&nbsp;</p>
            <IonSkeletonText animated style={{ height: '11px', width: '70px' }} />
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>&nbsp;</p>
            <IonSkeletonText animated style={{ height: '11px', width: '70px' }} />
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }
  return (
    <IonList lines="inset">
      <IonListHeader>Since debut</IonListHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonIcon slot="start" className="ion-margin-end" icon={flagOutline} />
              <IonLabel>
                <p>Races</p>
                <h2 className="font-weight-bold">{races}</h2>
              </IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonIcon slot="start" className="ion-margin-end" icon={stopwatchOutline} />
              <IonLabel>
                <p>Pole</p>
                <h2 className="font-weight-bold">{polePositions}</h2>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonIcon slot="start" className="ion-margin-end" icon={trophyOutline} />
              <IonLabel>
                <p>Wins</p>
                <h2 className="font-weight-bold">{wins}</h2>
              </IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonIcon slot="start" className="ion-margin-end" icon={podiumOutline} />
              <IonLabel>
                <p>Podiums</p>
                <h2 className="font-weight-bold">{podiums}</h2>
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default DriverAchievements;
