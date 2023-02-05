import React, { useEffect, useState } from 'react';
import { IonBackButton, IonBadge, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonToolbar } from '@ionic/react';
import { RaceResult, DriverStanding } from '../../models';
import { RouteComponentProps } from 'react-router';

interface DriverResultsProps extends RouteComponentProps<{
  season: string,
  driverId: string
}> { }

const DriverResults: React.FC<DriverResultsProps> = ({ match }) => {
  const [results, setResults] = useState<[RaceResult] | null>(null);
  const [driver, setDriver] = useState<DriverStanding | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${match.params.season}/drivers/${match.params.driverId}/results.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races));

    fetch(`https://ergast.com/api/f1/${match.params.season}/drivers/${match.params.driverId}/driverStandings.json`)
      .then(res => res.json())
      .then(result => setDriver(result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]));
  }, [match.params.season, match.params.driverId]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/driver/${match.params.driverId}`}></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          {driver && (
            <IonItem className='toolbar-item'>
              <div slot="start" className={`driver-number ion-margin-end driver-${driver.Constructors[0].constructorId}`}>{driver.Driver.permanentNumber}</div>
              <IonLabel>
                <p>{driver.Driver.givenName}</p>
                <h2 className="font-weight-bold ion-text-uppercase">{driver.Driver.familyName}</h2>
              </IonLabel>
              <IonIcon lazy slot="end" size="large" className="constructor" src={`assets/img/constructors/${driver.Constructors[0].constructorId}.svg`}/>
            </IonItem>
          )}
        </IonToolbar>
        <IonToolbar>
          <IonItem className="toolbar-item">
            <IonLabel>
              {match.params.season} Races
            </IonLabel>

            <div className="driver-position ion-margin-end">
              P{driver?.position}
            </div>
            <div slot="end" className="race-points">
              {driver?.points} Pts
            </div>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          {results && results.map(result =>
            <IonItem key={result.raceName} button routerLink={`/results/${result.season}/${result.round}/race`}>
              <div className="round-position ion-text-center font-weight-bold ion-margin-end">
                {result.round}.
              </div>
              <IonThumbnail className="country-thumbnail ion-margin-end">
                <IonImg src={`assets/img/flags/${result.Circuit.Location.country.replace(' ', '_')}.svg`} alt={result.Circuit.Location.country} />
              </IonThumbnail>
              <IonLabel>
                <h2 className="font-weight-bold">{result.Circuit.Location.country}</h2>
                <p>{new Date(result.date).toLocaleString('default', { day: 'numeric', month: 'numeric' })}</p>
              </IonLabel>
              <div className="driver-position ion-text-center ion-margin-end font-weight-bold">
                {result.Results[0].position}
              </div>
              <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{result.Results[0].points}</IonBadge>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DriverResults;