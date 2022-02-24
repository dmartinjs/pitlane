import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonIcon, IonThumbnail, IonTitle, IonImg } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { DriverStandingsLists } from '../models';
import { giftOutline, todayOutline } from 'ionicons/icons';
import DriverSeasons from '../components/driver/DriverSeasons';
import DriverRacesPodiums from '../components/driver/DriverAchievements';

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
                <div slot="start" className={`driver-number ion-margin-end driver-${driver.DriverStandings[0].Constructors[0].constructorId}`}>{driver.DriverStandings[0].Driver.permanentNumber}</div>
                <IonLabel>
                  <p>{driver.DriverStandings[0].Driver.givenName}</p>
                  <h2 className="font-weight-bold ion-text-uppercase">{driver.DriverStandings[0].Driver.familyName}</h2>
                </IonLabel>
                <IonThumbnail slot="end" className="country-thumbnail">
                  <IonImg src={`assets/img/flags/${driver.DriverStandings[0].Driver.nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
                </IonThumbnail>
              </IonItem>
            </IonList>
            <h3 className="ion-margin-start">Team</h3>
            <IonItem lines="full" button routerLink={`/constructor/${driver.DriverStandings[0].Constructors[0].constructorId}`}>
              <IonIcon lazy slot="start" size="large" className="constructor ion-margin-end" src={`assets/img/constructors/${driver.DriverStandings[0].Constructors[0].constructorId}.svg`}/>
              <IonLabel>
                <h2 className="font-weight-bold">{driver.DriverStandings[0].Constructors[0].name}</h2>
              </IonLabel>
              <IonThumbnail slot="end" className="country-thumbnail">
                <IonImg src={`assets/img/flags/${driver.DriverStandings[0].Constructors[0].nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
              </IonThumbnail>
            </IonItem>

            <h3 className="ion-margin-start">Achievements</h3>
            <DriverSeasons driverId={driver.DriverStandings[0].Driver.driverId}/>
            <DriverRacesPodiums driverId={driver.DriverStandings[0].Driver.driverId}/>

            <h3 className="ion-margin-start">Personal Informations</h3>
            <IonItem lines="full">
              <IonThumbnail slot="start" className="country-thumbnail ion-margin-end">
                <IonImg src={`assets/img/flags/${driver.DriverStandings[0].Driver.nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
              </IonThumbnail>
              <IonLabel>
                <p>Nationality</p>
                <h2 className="font-weight-bold">{driver.DriverStandings[0].Driver.nationality}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonIcon slot="start" className="ion-margin-end" icon={giftOutline}></IonIcon>
              <IonLabel>
                <p>Age</p>
                <h2 className="font-weight-bold">{new Date().getFullYear() - new Date(driver.DriverStandings[0].Driver.dateOfBirth).getFullYear()}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonIcon slot="start" className="ion-margin-end" icon={todayOutline}></IonIcon>
              <IonLabel>
                <p>Date of birth</p>
                <h2 className="font-weight-bold">{new Intl.DateTimeFormat('en-GB').format(new Date(driver.DriverStandings[0].Driver.dateOfBirth))}</h2>
              </IonLabel>
            </IonItem>
          </IonContent>
        )}
    </IonPage>
  );
};

export default DriverDetails;
