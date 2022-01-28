import React, { useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonButton, IonIcon, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import DriverStandings from '../components/driver/DriverStandings/DriverStandings';
import ConstructorStandings from '../components/constructor/ConstructorStandings/ConstructorStandings';
import RaceList from '../components/race/RaceList';
import { slideOptions } from '../utils/SlideOptions';

const Standings: React.FC = () => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('drivers');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'drivers':
        slider.current!.slideTo(0);
        break;
      case 'constructors':
        slider.current!.slideTo(1);
        break;
      case 'results':
        slider.current!.slideTo(2);
        break;
    }
  }

  const onSlideChange = (event: any) => {
    event.target.getActiveIndex().then((value: any) => {
      switch(value) {
        case 0:
          SetSelectedSegment('drivers');
          break;
        case 1:
          SetSelectedSegment('constructors');
          break;
        case 2:
          SetSelectedSegment('results');
          break;
      }
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Standings</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline} aria-label="settings"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment}>
            <IonSegmentButton value="drivers">
              <IonLabel>Drivers</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="constructors">
              <IonLabel>Teams</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="results">
              <IonLabel>Races</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides onIonSlideDidChange={onSlideChange} ref={slider} options={slideOptions}>
          <IonSlide id="drivers">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <DriverStandings/>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide id="constructors">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <ConstructorStandings/>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide id="results">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <RaceList results/>
                  </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Standings;
