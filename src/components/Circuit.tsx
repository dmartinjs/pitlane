import React, { useEffect, useState } from 'react';
import { IonSkeletonText, IonItem, IonLabel, IonThumbnail, IonList, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { Race } from '../models';
import LapRecord from './LapRecord';
import FirstGP from './FirstGP';

const Circuit: React.FC<{season: string, round: string, circuit: string}> = ({season, round, circuit}) => {
  const [race, setRace] = useState<Race | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}.json`)
      .then(res => res.json())
      .then(result => {
        setRace(result.MRData.RaceTable.Races[0]);
      });

    fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=xml&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${circuit}`)
      .then(res => res.text())
      .then(result => {
        const xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        setDescription((xmlDoc.querySelector("extract") as HTMLElement).textContent);
      });
  }, [round, season, circuit]);

  if (race === null) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonThumbnail slot="start" className="circuit-country-thumbnail ion-margin-end">
            &nbsp;
          </IonThumbnail>
          <IonLabel>
            <h2><IonSkeletonText animated style={{ height: '11px', width: '70px' }}/></h2>
            <p><IonSkeletonText animated style={{ height: '11px', width: '120px' }}/></p>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }
  return (
    <React.Fragment>
      <IonItem lines="none" className="ion-margin-top">
        <IonThumbnail slot="start" className="circuit-country-thumbnail ion-margin-end">
          <img src={`assets/img/flags/${race.Circuit.Location.country.replaceAll(' ', '_')}.svg`} alt={race.Circuit.Location.country}/>
        </IonThumbnail>
        <IonLabel>
          <h2 className="font-weight-bold">{race.Circuit.circuitName}</h2>
          <p>{race.Circuit.Location.country}</p>
        </IonLabel>
      </IonItem>
      <IonCard className="track-card">
        <IonCardContent>
          <IonIcon className="track ion-padding" src={`assets/img/tracks/${race.Circuit.circuitName.replaceAll(' ', '_').replace('ü', 'u').replace('ó', 'o').replace('í', 'i').replace('é', 'e')}.svg`}/>
        </IonCardContent>
      </IonCard>
      <FirstGP circuitId={race.Circuit.circuitId} />
      <LapRecord circuitId={race.Circuit.circuitId} />
      <p className="ion-padding">{description}</p>
    </React.Fragment>
  );
};

export default Circuit;