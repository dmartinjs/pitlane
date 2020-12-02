import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonSkeletonText, IonIcon } from '@ionic/react';
import { flagOutline, stopwatchOutline, squareOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

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
  let history = useHistory();
  const [raceSchedule, setraceSchedule] = useState<[Race] | null>(null);

  useEffect(() => {
    fetch(`/api/year/${season}`)
      .then(res => res.json())
      .then(result => setraceSchedule(result.races));
  }, [season]);

  const _handleClick = (season: string, round: string, session: string, date: Date) => {
    if(new Date(date) < new Date()) {
      history.push(`/results/${season}/${round}/${session}`);
    }
  }

  if (raceSchedule === null) {
    return (
      <IonList>
        <IonListHeader>&nbsp;</IonListHeader>
        {[...Array(5)].map(() =>
          <IonItem>
            <div slot="start" style={{ width: '24px'}}>
              &nbsp;
            </div>
            <IonLabel>
              <h2><IonSkeletonText animated style={{ height: '11px', width: '40px' }}/></h2>
              <p><IonSkeletonText animated style={{ height: '11px', width: '100px' }}/></p>
            </IonLabel>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '42px' }}/>
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
          <IonItem button onClick={() => _handleClick(season, round, 'race', race.sessions.race)}>
            <IonIcon slot="start" icon={flagOutline}/>
            <IonLabel>
              <h2><strong>Race</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long"}).format(new Date(race.sessions.race))}</p>
            </IonLabel>
            <IonBadge color="medium" slot="end">{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.race))}</IonBadge>
          </IonItem>
          <IonItem button onClick={() => _handleClick(season, round, 'qualifying', race.sessions.qualifying)}>
            <IonIcon slot="start" icon={stopwatchOutline}/>
            <IonLabel>
              <h2><strong>Qualifying</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long"}).format(new Date(race.sessions.qualifying))}</p>
            </IonLabel>
            <IonBadge color="medium" slot="end">{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.qualifying))}</IonBadge>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={squareOutline}/>
            <IonLabel>
              <h2><strong>Practice 3</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long"}).format(new Date(race.sessions.fp3))}</p>
            </IonLabel>
            <IonBadge color="medium" slot="end">{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.fp3))}</IonBadge>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={squareOutline}/>
            <IonLabel>
              <h2><strong>Practice 2</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long"}).format(new Date(race.sessions.fp2))}</p>
            </IonLabel>
            <IonBadge color="medium" slot="end">{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.fp2))}</IonBadge>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={squareOutline}/>
            <IonLabel>
              <h2><strong>Practice 1</strong></h2>
              <p>{new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "long"}).format(new Date(race.sessions.fp1))}</p>
            </IonLabel>
            <IonBadge color="medium" slot="end">{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(new Date(race.sessions.fp1))}</IonBadge>
          </IonItem>
        </>
      )}
    </IonList>
  );
};

export default Schedule;