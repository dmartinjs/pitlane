import React, { useEffect, useState } from 'react';
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonSkeletonText, IonThumbnail, IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Race } from '../../models';

const Schedule: React.FC<{season: string, round: string}> = ({season, round}) => {
  let history = useHistory();
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}.json`)
        .then(res => res.json())
        .then(result => setRace(result.MRData.RaceTable.Races[0]));
  }, [round, season]);

  const _handleClick = (season: string, round: string, session: string, date?: Date) => {
    if(date && new Date(date) < new Date()) {
      if(session === 'gp') {
        return history.push(`/results/${season}/${round}/race`);
      }
      return history.push(`/results/${season}/${round}/${session}`);
    }
  }

  if (race === null) {
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
        <IonItem>
          <div slot="start" className="ion-text-center ion-margin-end">
            <strong>{new Date(race.FirstPractice.date).getDate()}</strong><br/>
            <IonBadge color="medium" mode="ios">{new Date(race.FirstPractice.date).toLocaleString('default', { month: 'short' })}</IonBadge>
          </div>
          <IonLabel>
            <h2 className="font-weight-bold">Practice 1</h2>
            <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.FirstPractice.date}T${race.FirstPractice.time}`))}</p>
          </IonLabel>
        </IonItem>
        { race.Sprint && 
          <IonItem button onClick={() => _handleClick(season, round, 'qualifying', race.Qualifying.date)}>
            <div slot="start" className="ion-text-center ion-margin-end">
              <strong>{new Date(race.Qualifying.date).getDate()}</strong><br/>
              <IonBadge color="medium" mode="ios">{new Date(race.Qualifying.date).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2 className="font-weight-bold">Qualifying</h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.Qualifying.date}T${race.Qualifying.time}`))}</p>
            </IonLabel>
          </IonItem>
        }
        <IonItem>
          <div slot="start" className="ion-text-center ion-margin-end">
            <strong>{new Date(race.SecondPractice.date).getDate()}</strong><br/>
            <IonBadge color="medium" mode="ios">{new Date(race.SecondPractice.date).toLocaleString('default', { month: 'short' })}</IonBadge>
          </div>
          <IonLabel>
            <h2 className="font-weight-bold">Practice 2</h2>
            <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.SecondPractice.date}T${race.SecondPractice.time}`))}</p>
          </IonLabel>
        </IonItem>
        {race.ThirdPractice &&
          <IonItem>
            <div slot="start" className="ion-text-center ion-margin-end">
              <strong>{new Date(race.ThirdPractice.date).getDate()}</strong><br/>
              <IonBadge color="medium" mode="ios">{new Date(race.ThirdPractice.date).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2 className="font-weight-bold">Practice 3</h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.ThirdPractice.date}T${race.ThirdPractice.time}`))}</p>
            </IonLabel>
          </IonItem>
        }
        {race.Sprint && 
          <IonItem button onClick={() => _handleClick(season, round, 'sprint', race.Sprint?.date)}>
            <div slot="start" className="ion-text-center ion-margin-end">
              <strong>{new Date(race.Sprint.date).getDate()}</strong><br/>
              <IonBadge color="medium" mode="ios">{new Date(race.Sprint.date).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2 className="font-weight-bold">Sprint</h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.Sprint.date}T${race.Sprint.time}`))}</p>
            </IonLabel>
          </IonItem>
        }
        { !race.Sprint && 
          <IonItem button onClick={() => _handleClick(season, round, 'qualifying', race.Qualifying.date)}>
            <div slot="start" className="ion-text-center ion-margin-end">
              <strong>{new Date(race.Qualifying.date).getDate()}</strong><br/>
              <IonBadge color="medium" mode="ios">{new Date(race.Qualifying.date).toLocaleString('default', { month: 'short' })}</IonBadge>
            </div>
            <IonLabel>
              <h2 className="font-weight-bold">Qualifying</h2>
              <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.Qualifying.date}T${race.Qualifying.time}`))}</p>
            </IonLabel>
          </IonItem>
        }
        <IonItem button onClick={() => _handleClick(season, round, 'gp', race.date)}>
          <div slot="start" className="ion-text-center ion-margin-end">
            <strong>{new Date(race.date).getDate()}</strong><br/>
            <IonBadge color="medium" mode="ios">{new Date(race.date).toLocaleString('default', { month: 'short' })}</IonBadge>
          </div>
          <IonLabel>
            <h2 className="font-weight-bold">Race</h2>
            <p>{new Intl.DateTimeFormat('en-GB', {hour: "numeric", minute: "numeric"}).format(Date.parse(`${race.date}T${race.time}`))}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default Schedule;