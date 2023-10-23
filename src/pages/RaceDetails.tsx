import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import Schedule from '../components/race/Schedule';
import Circuit from '../components/circuit/Circuit/Circuit';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string,
  round: string,
  country: string,
  circuit: string
}> { }

const RaceDetails: React.FC<RaceDetailsProps> = ({ match }) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('schedule');
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch (event.detail.value) {
      case 'schedule':
        swiperInstance?.slideTo(0);
        break;
      case 'circuit':
        swiperInstance?.slideTo(1);
        break;
    }
  }

  const onSlideChange = () => {
    switch (swiperInstance?.activeIndex) {
      case 0:
        SetSelectedSegment('schedule');
        break;
      case 1:
        SetSelectedSegment('circuit');
        break;
    }
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
        <Swiper onSlideChange={onSlideChange} onSwiper={(swiper: SwiperInterface) => setSwiperInstance(swiper)} initialSlide={0} autoHeight={true}>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <Schedule season={match.params.season} round={match.params.round} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
          <SwiperSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <Circuit season={match.params.season} round={match.params.round} circuit={match.params.circuit} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default RaceDetails;
