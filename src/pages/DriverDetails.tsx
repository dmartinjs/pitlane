import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonIcon, IonThumbnail, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { DriverStandingsLists } from '../models';
import Seasons from '../components/Seasons';

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


  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/standings"></IonBackButton>
              <IonTitle>Driver</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {driver && (
          <IonContent>
            <IonList lines="full">
              <IonItem>
                <IonThumbnail slot="start" className="circuit-country-thumbnail ion-margin-end">
                  <img src={`assets/img/flags/${driver.DriverStandings[0].Driver.nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
                </IonThumbnail>
                <IonLabel>
                  <p>{driver.DriverStandings[0].Driver.givenName}</p>
                  <h2>{driver.DriverStandings[0].Driver.familyName}</h2>
                </IonLabel>
                <div slot="end" className="font-weight-bold">
                  {driver.DriverStandings[0].Driver.permanentNumber}
                </div>
              </IonItem>
              <IonItem lines="none" button routerLink={`/constructor/${driver.DriverStandings[0].Constructors[0].constructorId}`}>
                <div className="item-label-start ion-margin-end">Team</div>
                <IonLabel>
                  <h2>{driver.DriverStandings[0].Constructors[0].name}</h2>
                </IonLabel>
                <IonIcon lazy slot="end" size="large" src={`assets/img/constructors/${driver.DriverStandings[0].Constructors[0].constructorId}.svg`}/>
              </IonItem>
            </IonList>
            <Seasons driverId={match.params.driverId} />
          </IonContent>
        )}
    </IonPage>
  );
};

export default DriverDetails;
