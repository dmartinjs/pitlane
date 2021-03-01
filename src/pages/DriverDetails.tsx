import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonListHeader, IonIcon, IonThumbnail } from '@ionic/react';
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
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {driver && (
          <IonContent>
            <IonList lines="full">
              <IonItem className="ion-margin-top">
                <IonThumbnail slot="start" className="circuit-country-thumbnail ion-margin-end">
                  <img src={`assets/img/flags/${driver.DriverStandings[0].Driver.nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
                </IonThumbnail>
                <IonLabel>
                  <h2 className="font-weight-bold">{driver.DriverStandings[0].Driver.givenName}</h2>
                  <p>{driver.DriverStandings[0].Driver.familyName}</p>
                </IonLabel>
              </IonItem>
            </IonList>
            <Seasons driverId={match.params.driverId} />
          </IonContent>
        )}
    </IonPage>
  );
};

export default DriverDetails;
