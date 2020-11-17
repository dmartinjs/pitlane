import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonTitle, IonList, IonListHeader, IonIcon, IonImg } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { DriverStandingsLists } from '../models';
import { trophy, flag, podium, gift, speedometer, pin } from 'ionicons/icons';

interface DriverDetailsProps extends RouteComponentProps<{
  driverId: string,
}> {}

const DriverDetails: React.FC<DriverDetailsProps> = ({match}) => {
  const [driver, setDriver] = useState<DriverStandingsLists | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/current/drivers/${match.params.driverId}/driverStandings.json`)
      .then(res => res.json())
      .then(result => setDriver(result.MRData.StandingsTable.StandingsLists[0]));
  }, [match.params.driverId]);

  const birthday = driver && new Intl.DateTimeFormat('en-GB').format(new Date(driver.DriverStandings[0].Driver.dateOfBirth));

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/ranks"></IonBackButton>
            </IonButtons>
            <IonTitle>{driver && driver.DriverStandings[0].Driver.givenName} {driver && driver.DriverStandings[0].Driver.familyName}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {driver && (
          <IonContent>
            <IonList>
              <IonListHeader>{driver.season} Season</IonListHeader>
              <IonItem>
                <IonIcon slot="start" icon={podium}></IonIcon>
                <IonLabel>
                  <h2>POSITION</h2>
                  <p>{driver.DriverStandings[0].position}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={speedometer}></IonIcon>
                <IonLabel>
                  <h2>POINTS</h2>
                  <p>{driver.DriverStandings[0].points}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={flag}></IonIcon>
                <IonLabel>
                  <h2>RACES</h2>
                  <p>{driver.round}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={trophy}></IonIcon>
                <IonLabel>
                  <h2>WINS</h2>
                  <p>{driver.DriverStandings[0].wins}</p>
                </IonLabel>
              </IonItem>
            </IonList>

            <IonList>
              <IonListHeader>Team</IonListHeader>
              <IonItem className="ion-margin-bottom" button detail href={`/constructor/${driver.DriverStandings[0].Constructors[0].constructorId}`}>
                <IonLabel>
                  {driver.DriverStandings[0].Constructors[0].name}
                </IonLabel>
              </IonItem>
            </IonList>

            <IonList>
              <IonListHeader>Personal informations</IonListHeader>
              <IonItem>
                <IonIcon slot="start" icon={pin}></IonIcon>
                <IonLabel>
                  <p>Country</p>
                  <h3>{driver.DriverStandings[0].Driver.nationality}</h3>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={gift}></IonIcon>
                <IonLabel>
                  <p>Date of birth</p>
                  <h3>{birthday}</h3>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        )}
    </IonPage>
  );
};

export default DriverDetails;
