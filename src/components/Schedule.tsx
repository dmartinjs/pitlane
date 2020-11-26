import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonSkeletonText } from '@ionic/react';

export interface Race {
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
  fp2:       Date;
  fp3:       Date;
  qualifying: Date;
  race:       Date;
}

const Schedule: React.FC<{season: string, round: string}> = ({season, round}) => {
  const [raceSchedule, setraceSchedule] = useState<[Race] | null>(null);

  useEffect(() => {
    fetch(`/api/year/${season}`)
      .then(res => res.json())
      .then(result => setraceSchedule(result.races));
  }, [season]);

  if (raceSchedule === null) {
    return (
      <IonList>
        <IonListHeader>&nbsp;</IonListHeader>
        {[...Array(5)].map(() =>
          <IonItem>
            <div slot="start" style={{ width: '32px'}}>
              &nbsp;
            </div>
            <IonLabel>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '80px' }}/></h2>
              <p><IonSkeletonText animated style={{ height: '11px', width: '30px' }}/></p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      <IonListHeader>Race Weekend</IonListHeader>
      {raceSchedule && raceSchedule.filter(race => race.round === parseInt(round)).map(race =>
        <>
          <IonItem>
            <div slot="start" className="ion-text-center">
              {new Date(race.sessions.race).getDate()}<br/>
              <IonBadge color="medium">{new Date(race.sessions.race).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2><strong>Race</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.race))}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <div slot="start" className="ion-text-center">
              {new Date(race.sessions.qualifying).getDate()}<br/>
              <IonBadge color="medium">{new Date(race.sessions.qualifying).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2><strong>Qualifying</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.qualifying))}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <div slot="start" className="ion-text-center">
              {new Date(race.sessions.fp3).getDate()}<br/>
              <IonBadge color="medium">{new Date(race.sessions.fp3).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2><strong>Practice 3</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.fp3))}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <div slot="start" className="ion-text-center">
              {new Date(race.sessions.fp2).getDate()}<br/>
              <IonBadge color="medium">{new Date(race.sessions.fp2).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2><strong>Practice 2</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.fp2))}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <div slot="start" className="ion-text-center">
              {new Date(race.sessions.fp1).getDate()}<br/>
              <IonBadge color="medium">{new Date(race.sessions.fp1).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2><strong>Practice 1</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.fp1))}</p>
            </IonLabel>
          </IonItem>
        </>
      )}
    </IonList>
  );
};

export default Schedule;