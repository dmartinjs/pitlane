import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonSkeletonText, IonThumbnail, IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Race } from '../../models';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

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
  sprintQualifying: Date;
  qualifying: Date;
  gp:         Date;
}

const Schedule: React.FC<{season: string, round: string}> = ({season, round}) => {
  let history = useHistory();
  const [race, setRace] = useState<Race | null>(null);
  const [raceSchedule, setraceSchedule] = useState<RaceSession | null>(null);
  const { Http } = Plugins;

  useEffect(() => {
    Http.request({
      method: 'GET',
      url: `https://ergast.com/api/f1/${season}/${round}.json`,
    })
    .then(({ data }: any) => {
      setRace(data.MRData.RaceTable.Races[0]);
    })

    Http.request({
      method: 'GET',
      url: `https://f1calendar.com/api/year/${season}`,
    })
    .then(({ data }: any) => {
      setraceSchedule(data.races[parseInt(round) - 1]);
    })
  }, [round, season, Http]);

  const _handleClick = (season: string, round: string, session: string, date: Date) => {
    if(new Date(date) < new Date() && (session === 'qualifying' || session === 'gp')) {
      if(session === 'gp') {
        return history.push(`/results/${season}/${round}/race`);
      }
      return history.push(`/results/${season}/${round}/${session}`);
    }
  }

  const renderSessionName = (session: string) => {
    switch(session) {
      case 'fp1':
        return 'Practice 1';
      case 'fp2':
        return 'Practice 2';
      case 'fp3':
        return 'Practice 3';
      case 'qualifying':
        return 'Qualifying';
      case 'sprintQualifying':
        return 'Sprint Qualifying';
      case 'gp':
        return 'Race';
      default:
        return 'foo';
    }
  }

  if (raceSchedule === null || race === null) {
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
    <>
    <IonItem lines="none" className="ion-margin-top">
        <IonThumbnail slot="start" className="circuit-country-thumbnail ion-margin-end">
          <IonImg src={`assets/img/flags/${race.Circuit.Location.country.replace(/\s+/g, '_')}.svg`} alt={race.Circuit.Location.country}/>
        </IonThumbnail>
        <IonLabel>
          <h2><strong>{race.Circuit.Location.country}</strong> {season}</h2>
          <p>{race.raceName}</p>
        </IonLabel>
      </IonItem>
      <IonList lines="full">
        <IonListHeader>Race Weekend</IonListHeader>
        {Object.keys(raceSchedule.sessions).map(session =>
          <IonItem button={(session === 'qualifying' || session === 'gp') && true} onClick={() => _handleClick(season, round, session, raceSchedule.sessions.qualifying)}>
            <div slot="start" className="ion-text-center">
              <strong>{new Date(raceSchedule.sessions[session as keyof Sessions]).getDate()}</strong><br/>
              <IonBadge color="medium" mode="ios">{new Date(raceSchedule.sessions[session as keyof Sessions]).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2 className="font-weight-bold">{renderSessionName(session)}</h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(raceSchedule.sessions[session as keyof Sessions]))}</p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    </>
  );
};

export default Schedule;