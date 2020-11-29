import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonTitle, IonList, IonListHeader, IonIcon, IonAvatar } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { ConstructorStandingsLists, Driver } from '../models';
import { trophy, flag, podium, speedometer, pin } from 'ionicons/icons';

interface ConstructorDetailsProps extends RouteComponentProps<{
  constructorId: string,
}> {}

const ConstructorDetails: React.FC<ConstructorDetailsProps> = ({match}) => {
  const [constructor, setConstructor] = useState<ConstructorStandingsLists | null>(null);
  const [drivers, setDrivers] = useState<[Driver] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/current/constructors/${match.params.constructorId}/constructorStandings.json`)
      .then(res => res.json())
      .then(result => setConstructor(result.MRData.StandingsTable.StandingsLists[0]));

    fetch(`https://ergast.com/api/f1/current/constructors/${match.params.constructorId}/drivers.json`)
      .then(res => res.json())
      .then(result => setDrivers(result.MRData.DriverTable.Drivers));
  }, [match.params.constructorId]);

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/standings"></IonBackButton>
            </IonButtons>
            <IonTitle>{constructor && constructor.ConstructorStandings[0].Constructor.name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {constructor && (
          <IonContent>
            <IonList>
              <IonListHeader>{constructor.season} Season</IonListHeader>
              <IonItem>
                <IonIcon slot="start" icon={podium}></IonIcon>
                <IonLabel>
                  <h2>POSITION</h2>
                  <p>{constructor.ConstructorStandings[0].position}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={speedometer}></IonIcon>
                <IonLabel>
                  <h2>POINTS</h2>
                  <p>{constructor.ConstructorStandings[0].points}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={flag}></IonIcon>
                <IonLabel>
                  <h2>RACES</h2>
                  <p>{constructor.round}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={trophy}></IonIcon>
                <IonLabel>
                  <h2>WINS</h2>
                  <p>{constructor.ConstructorStandings[0].wins}</p>
                </IonLabel>
              </IonItem>
            </IonList>

            <IonList>
              <IonListHeader>Drivers</IonListHeader>
              {drivers && drivers.map(driver =>
                <IonItem className="ion-margin-bottom" button detail href={`/driver/${driver.driverId}`} key={driver.driverId}>
                  <span slot="start">
                    {driver.permanentNumber}
                  </span>
                  <IonLabel>
                    <h2>{driver.givenName}</h2>
                    <h3><strong className="ion-text-uppercase">{driver.familyName}</strong></h3>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>

            <IonList>
              <IonListHeader>Informations</IonListHeader>
              <IonItem>
                <IonAvatar slot="start">
                  <img src={`/assets/img/flags/${constructor.ConstructorStandings[0].Constructor.nationality}.svg`} alt={constructor.ConstructorStandings[0].Constructor.nationality} />
                </IonAvatar>
                <IonLabel>
                  <p>Country</p>
                  <h3>{constructor.ConstructorStandings[0].Constructor.nationality}</h3>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        )}
    </IonPage>
  );
};

export default ConstructorDetails;
