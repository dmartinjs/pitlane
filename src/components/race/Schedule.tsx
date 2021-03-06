import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonSkeletonText, IonThumbnail, IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Race } from '../../models';

export interface RaceSession {
  name:      string;
  location:  string;
  latitude:  number;
  longitude: number;
  tbc:       boolean;
  round:     number;
  slug:      string;
  localeKey: string;
  sessions:  Sessions;
}

export interface Sessions {
  fp1:        Date;
  fp2:        Date;
  fp3:        Date;
  qualifying: Date;
  gp:         Date;
}

const Schedule: React.FC<{season: string, round: string}> = ({season, round}) => {
  let history = useHistory();
  const [race, setRace] = useState<Race | null>(null);
  const [raceSchedule, setraceSchedule] = useState<RaceSession | null>(null);

  useEffect(() => {
    fetch(`/api/year/${season}`)
      .then(res => res.json())
      .then(result => setraceSchedule(result.races[parseInt(round) - 1]));
    
    fetch(`https://ergast.com/api/f1/${season}/${round}.json`)
      .then(res => res.json())
      .then(result => {
        setRace(result.MRData.RaceTable.Races[0]);
      });
  }, [round, season]);

  const _handleClick = (season: string, round: string, session: string, date: Date) => {
    if(new Date(date) < new Date()) {
      history.push(`/results/${season}/${round}/${session}`);
    }
  }

  if (raceSchedule === null) {
    return (
      <IonList lines="full">
        <IonListHeader>&nbsp;</IonListHeader>
        {[...Array(5)].map((item, index) =>
          <IonItem key={index}>
            <div slot="start">
              &nbsp;&nbsp;
            </div>
            <IonLabel>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '40px' }}/></h2>
              <p><IonSkeletonText animated style={{ height: '11px', width: '100px' }}/></p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <React.Fragment>
      {race &&
          <IonItem lines="none" className="ion-margin-top">
            <IonThumbnail slot="start" className="circuit-country-thumbnail ion-margin-end">
              <IonImg src={`assets/img/flags/${race.Circuit.Location.country.replaceAll(' ', '_')}.svg`} alt={race.Circuit.Location.country}/>
            </IonThumbnail>
            <IonLabel>
              <h2><strong>{race.Circuit.Location.country}</strong> {season}</h2>
              <p>{race.raceName}</p>
            </IonLabel>
          </IonItem>
      }
      <IonList lines="full">
        <IonListHeader>Race Weekend</IonListHeader>
        {raceSchedule &&
          <React.Fragment>
            <IonItem>
              <div slot="start" className="ion-text-center">
                <strong>{new Date(raceSchedule.sessions.fp1).getDate()}</strong><br/>
                <IonBadge color="medium" mode="ios">{new Date(raceSchedule.sessions.fp1).toLocaleString('default', { month: 'short' })}</IonBadge>
              </div>
              <IonLabel>
                <h2 className="font-weight-bold">Practice 1</h2>
                <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(raceSchedule.sessions.fp1))}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <div slot="start" className="ion-text-center">
                <strong>{new Date(raceSchedule.sessions.fp2).getDate()}</strong><br/>
                <IonBadge color="medium" mode="ios">{new Date(raceSchedule.sessions.fp2).toLocaleString('default', { month: 'short' })}</IonBadge>
              </div>
              <IonLabel>
                <h2 className="font-weight-bold">Practice 2</h2>
                <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(raceSchedule.sessions.fp2))}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <div slot="start" className="ion-text-center">
                <strong>{new Date(raceSchedule.sessions.fp3).getDate()}</strong><br/>
                <IonBadge color="medium" mode="ios">{new Date(raceSchedule.sessions.fp3).toLocaleString('default', { month: 'short' })}</IonBadge>
              </div>
              <IonLabel>
                <h2 className="font-weight-bold">Practice 3</h2>
                <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(raceSchedule.sessions.fp3))}</p>
              </IonLabel>
            </IonItem>
            <IonItem button onClick={() => _handleClick(season, round, 'qualifying', raceSchedule.sessions.qualifying)}>
              <div slot="start" className="ion-text-center">
                <strong>{new Date(raceSchedule.sessions.qualifying).getDate()}</strong><br/>
                <IonBadge color="medium" mode="ios">{new Date(raceSchedule.sessions.qualifying).toLocaleString('default', { month: 'short' })}</IonBadge>
              </div>
              <IonLabel>
                <h2 className="font-weight-bold">Qualifying</h2>
                <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(raceSchedule.sessions.qualifying))}</p>
              </IonLabel>
            </IonItem>
            <IonItem button onClick={() => _handleClick(season, round, 'race', raceSchedule.sessions.gp)}>
              <div slot="start" className="ion-text-center">
                <strong>{new Date(raceSchedule.sessions.gp).getDate()}</strong><br/>
                <IonBadge color="medium" mode="ios">{new Date(raceSchedule.sessions.gp).toLocaleString('default', { month: 'short' })}</IonBadge>
              </div>
              <IonLabel>
                <h2 className="font-weight-bold">Race</h2>
                <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(raceSchedule.sessions.gp))}</p>
              </IonLabel>
            </IonItem>
          </React.Fragment>
        }
      </IonList>
    </React.Fragment>
  );
};

export default Schedule;