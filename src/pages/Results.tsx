import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonBackButton, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Race } from '../models';
import RaceResults from '../components/results/RaceResults/RaceResults';
import QualifyingResults from '../components/results/QualifyingResults';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string,
  round: string,
  session: string
}> {}

const Results: React.FC<RaceDetailsProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>(match.params.session);
  const [race, setRace] = useState<Race | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${match.params.season}/${match.params.round}.json`)
      .then(res => res.json())
      .then(result => {
        setRace(result.MRData.RaceTable.Races[0]);
      });
  }, [match.params.season, match.params.round]);

  const slider = useRef<HTMLIonSlidesElement>(null);

  const slideOptions = {
    autoHeight: true
  }

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'qualifying':
        slider.current!.slideTo(0);
        break;
      case 'race':
        slider.current!.slideTo(1);
        break;
    }
  }

  const onSlideLoad = () => {
    switch(match.params.session) {
      case 'qualifying':
        slider.current!.slideTo(0);
        break;
      case 'race':
        slider.current!.slideTo(1);
        break;
    }
  }

  const onSlideChange = (event: any) => {
    event.target.getActiveIndex().then((value: any) => {
      switch(value) {
        case 0:
          SetSelectedSegment('qualifying');
          break;
        case 1:
          SetSelectedSegment('race');
          break;
      }
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
          <IonTitle>{race?.Circuit.Location.country} {race?.season}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment} scrollable>
            <IonSegmentButton value="qualifying">
              <IonLabel>Qualifying</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="race">
              <IonLabel>Race</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides onIonSlideDidChange={onSlideChange} onIonSlidesDidLoad={onSlideLoad} ref={slider} options={slideOptions}>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <QualifyingResults season={match.params.season} round={match.params.round}/>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <RaceResults season={match.params.season} round={match.params.round}/>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Results;
