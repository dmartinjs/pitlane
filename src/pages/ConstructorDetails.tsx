import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonThumbnail, IonIcon, IonTitle, IonImg } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { ConstructorStandingsLists, Driver } from '../models';
import Seasons from '../components/Seasons';

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
              <IonTitle>Constructor</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {constructor && (
          <IonContent>
            <IonList lines="full">
              <IonItem>
                <IonIcon lazy slot="start" size="large" className="constructor" src={`assets/img/constructors/${constructor.ConstructorStandings[0].Constructor.constructorId}.svg`}/>
                <IonLabel>
                  <p>Team</p>
                  <h2 className="font-weight-bold">{constructor.ConstructorStandings[0].Constructor.name}</h2>
                </IonLabel>
                <div slot="end">
                  {constructor.ConstructorStandings[0].Constructor.nationality}
                </div>
              </IonItem>
              {drivers && drivers.slice(0, 2).map(driver =>
                <IonItem button routerLink={`/driver/${driver.driverId}`} key={driver.driverId}>
                  <div slot="start" className="driver-number font-weight-bold">
                    {driver.permanentNumber}
                  </div>
                  <IonLabel>
                    <p>{driver.givenName}</p>
                    <h2 className="font-weight-bold">{driver.familyName}</h2>
                  </IonLabel>
                  <IonThumbnail slot="end" className="country-thumbnail">
                    <IonImg src={`assets/img/flags/${driver.nationality}.svg`} alt={driver.nationality}/>
                  </IonThumbnail>
                </IonItem>
              )}
            </IonList>
            <Seasons constructorId={match.params.constructorId} />
          </IonContent>
        )}
    </IonPage>
  );
};

export default ConstructorDetails;
