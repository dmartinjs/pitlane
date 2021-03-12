import React, { useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonTitle, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Schedule from '../components/race/Schedule';
import Circuit from '../components/circuit/Circuit';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string, 
  round: string,
  country: string,
  circuit: string
}> {}

const RaceDetails: React.FC<RaceDetailsProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('schedule');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const slideOptions = {
    initialSlide: 0,
    autoHeight: true
  }

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'schedule':
        slider.current!.slideTo(0);
        break;
      case 'circuit':
        slider.current!.slideTo(1);
        break;
    }
  }

  const onSlideChange = (event: any) => {
    event.target.getActiveIndex().then((value: any) => {
      switch(value) {
        case 0:
          SetSelectedSegment('schedule');
          break;
        case 1:
          SetSelectedSegment('circuit');
          break;
      }
    })
  }

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/races"></IonBackButton>
          <IonTitle>Race</IonTitle>
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <IonSegment onIonChange={onSegmentChange} value={selectedSegment}>
          <IonSegmentButton value="schedule">
            <IonLabel>Schedule</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="circuit">
            <IonLabel>Circuit</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonSlides onIonSlideDidChange={onSlideChange} ref={slider} options={slideOptions}>
        <IonSlide>
          <IonGrid>
            <IonRow>
              <IonCol>
                <Schedule season={match.params.season} round={match.params.round}/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide>
        <IonGrid>
            <IonRow>
              <IonCol>
                <Circuit season={match.params.season} round={match.params.round} circuit={match.params.circuit}/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
      </IonSlides>
    </IonContent>
  </IonPage>
  );
};

export default RaceDetails;
