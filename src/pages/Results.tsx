import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonBackButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Race } from '../models';
import RaceResults from '../components/results/RaceResults/RaceResults';
import QualifyingResults from '../components/results/QualifyingResults';
import SprintResults from '../components/results/SprintResults';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper';

interface RaceDetailsProps extends RouteComponentProps<{
  season: string,
  round: string,
  session: string
}> { }

const Results: React.FC<RaceDetailsProps> = ({ match }) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>(match.params.session);
  const [race, setRace] = useState<Race | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${match.params.season}/${match.params.round}.json`)
      .then(res => res.json())
      .then(result => {
        setRace(result.MRData.RaceTable.Races[0]);
      });
  }, [match.params.season, match.params.round]);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch (event.detail.value) {
      case 'qualifying':
        swiperInstance?.slideTo(0);
        break;
      case 'sprint':
        swiperInstance?.slideTo(1);
        break;
      case 'race':
        swiperInstance?.slideTo(2);
        break;
    }
  }

  const onSlideLoad = () => {
    switch (match.params.session) {
      case 'qualifying':
        swiperInstance?.slideTo(0);
        break;
      case 'sprint':
        swiperInstance?.slideTo(1);
        break;
      case 'race':
        swiperInstance?.slideTo(2);
        break;
    }
  }

  const onSlideChange = () => {
    switch (swiperInstance?.activeIndex) {
      case 0:
        SetSelectedSegment('qualifying');
        break;
      case 1:
        SetSelectedSegment('sprint');
        break;
      case 2:
        SetSelectedSegment('race');
        break;
    }
  }

  return (
    <IonPage>
      {race &&
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/standings"></IonBackButton>
              </IonButtons>
              <IonTitle>{race.Circuit.Location.country} {race.season}</IonTitle>
            </IonToolbar>
            <IonToolbar>
              <IonSegment onIonChange={onSegmentChange} value={selectedSegment} scrollable>
                <IonSegmentButton value="qualifying">
                  <IonLabel>Qualifying</IonLabel>
                </IonSegmentButton>
                {race.Sprint !== undefined &&
                  <IonSegmentButton value="sprint">
                    <IonLabel>Sprint</IonLabel>
                  </IonSegmentButton>
                }
                <IonSegmentButton value="race">
                  <IonLabel>Race</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Swiper onSlideChange={onSlideChange} onInit={onSlideLoad} onSwiper={(swiper: SwiperInterface) => setSwiperInstance(swiper)} autoHeight={true}>
              <SwiperSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <QualifyingResults season={match.params.season} round={match.params.round} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </SwiperSlide>
              {race?.Sprint !== undefined &&
                <SwiperSlide>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <SprintResults season={match.params.season} round={match.params.round} />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </SwiperSlide>
              }
              <SwiperSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <RaceResults season={match.params.season} round={match.params.round} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </SwiperSlide>
            </Swiper>
          </IonContent>
        </>
      }
    </IonPage>
  );
};

export default Results;
