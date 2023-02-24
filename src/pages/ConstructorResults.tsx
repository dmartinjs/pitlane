import React, { useEffect, useState } from 'react';
import { IonBackButton, IonBadge, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonThumbnail, IonToolbar } from '@ionic/react';
import { RaceResult, ConstructorStanding } from '../models';
import { RouteComponentProps } from 'react-router';

interface ConstructorResultsProps extends RouteComponentProps<{
  season: string,
  constructorId: string
}> { }

const ConstructorResults: React.FC<ConstructorResultsProps> = ({ match }) => {
  const [results, setResults] = useState<[RaceResult] | null>(null);
  const [constructor, setConstructor] = useState<ConstructorStanding | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${match.params.season}/constructors/${match.params.constructorId}/results.json?limit=300`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races));

    fetch(`https://ergast.com/api/f1/${match.params.season}/constructors/${match.params.constructorId}/constructorStandings.json`)
      .then(res => res.json())
      .then(result => setConstructor(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]));
  }, [match.params.season, match.params.constructorId]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/driver/${match.params.constructorId}/${new Date().getFullYear()}`}></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          {constructor && (
            <IonItem className='toolbar-item'>
              <IonIcon lazy slot="start" size="large" className="constructor ion-margin-end" src={`assets/img/constructors/${constructor.Constructor.constructorId}.svg`} />
              <IonLabel>
                <h2 className="font-weight-bold">{constructor.Constructor.name}</h2>
              </IonLabel>
              <IonThumbnail slot="end" className="country-thumbnail">
                <IonImg src={`assets/img/flags/${constructor.Constructor.nationality}.svg`} alt={constructor.Constructor.nationality} />
              </IonThumbnail>
            </IonItem>
          )}
        </IonToolbar>
        <IonToolbar>
          <IonItem className="toolbar-item">
            <IonLabel>
              {match.params.season} Races
            </IonLabel>

            <div className="driver-position ion-margin-end">
              P{constructor?.position}
            </div>
            <div slot="end" className="race-points">
              {constructor?.points} Pts
            </div>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
                <p>{result.Results[0].Driver.familyName} - {result.Results[0].positionText !== 'R' ? `P${result.Results[0].position}` : 'DNF'} - {result.Results[0].points} pts</p>
                <p>{result.Results[1].Driver.familyName} - {result.Results[1].positionText !== 'R' ? `P${result.Results[1].position}` : 'DNF'} - {result.Results[1].points} pts</p>
              </IonLabel>
              <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</IonBadge>
            </IonItem>
          )}
      </IonContent>
    </IonPage>
  );
};

export default ConstructorResults;