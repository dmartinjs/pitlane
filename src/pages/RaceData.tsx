import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Positions from '../components/race/data/Positons';
import LapTimes from '../components/race/data/LapTimes';
import PitStops from '../components/race/data/PitStops';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper';

interface RaceDataProps extends RouteComponentProps<{
  season: string,
  round: string,
  driverId: string
}> { }

const RaceData: React.FC<RaceDataProps> = ({ match }) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('positions');
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch (event.detail.value) {
      case 'positions':
        swiperInstance?.slideTo(0);
        break;
      case 'laptimes':
        swiperInstance?.slideTo(1);
        break;
      case 'pitstops':
        swiperInstance?.slideTo(2);
        break;
    }
  }

  const onSlideChange = () => {
    switch (swiperInstance?.activeIndex) {
      case 0:
        SetSelectedSegment('positions');
        break;
      case 1:
        SetSelectedSegment('laptimes');
        break;
      case 2:
        SetSelectedSegment('pitstops');
        break;
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
          <IonTitle>Data</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment} scrollable>
            <IonSegmentButton value="positions">
              <IonLabel>Positions</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="laptimes">
              <IonLabel>Lap Times</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pitstops">
              <IonLabel>Pit Stops</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Swiper onSlideChange={onSlideChange} onSwiper={(swiper: SwiperInterface) => setSwiperInstance(swiper)} initialSlide={0} autoHeight={true}>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <Positions season={match.params.season} round={match.params.round} driverId={match.params.driverId} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <LapTimes season={match.params.season} round={match.params.round} driverId={match.params.driverId} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <PitStops season={match.params.season} round={match.params.round} driverId={match.params.driverId} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default RaceData;
