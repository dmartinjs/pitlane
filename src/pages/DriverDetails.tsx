import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonIcon, IonThumbnail, IonImg, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonBadge, IonListHeader } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { DriverStandingsLists } from '../models';
import { giftOutline, readerOutline, todayOutline } from 'ionicons/icons';
import DriverRacesPodiums from '../components/driver/DriverAchievements';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface } from 'swiper';

interface DriverDetailsProps extends RouteComponentProps<{
  driverId: string,
  season: string
}> { }

const DriverDetails: React.FC<DriverDetailsProps> = ({ match }) => {
  const [driver, setDriver] = useState<DriverStandingsLists[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [selectedSegment, SetSelectedSegment] = useState<string>('overview');
  const seasonDetails = driver && (driver.some(standing => standing.season === match.params.season) ? driver.find(driver => driver.season.toString() === match.params.season) : driver[0]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch (event.detail.value) {
      case 'overview':
        swiperInstance?.slideTo(0);
        break;
      case 'seasons':
        swiperInstance?.slideTo(1);
        break;
      case 'bio':
        swiperInstance?.slideTo(2);
        break;
    }
  }

  const onSlideChange = () => {
    switch (swiperInstance?.activeIndex) {
      case 0:
        SetSelectedSegment('overview');
        break;
      case 1:
        SetSelectedSegment('seasons');
        break;
      case 2:
        SetSelectedSegment('bio');
        break;
    }
  }

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/drivers/${match.params.driverId}/driverStandings.json?limit=60`)
      .then(res => res.json())
      .then(result => {
        fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=xml&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.url.split('/').pop()}`)
          .then(res => res.text())
          .then(result => {
            const xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            setDescription((xmlDoc.querySelector("extract") as HTMLElement).textContent);
          });

        return setDriver(result.MRData.StandingsTable.StandingsLists.reverse())
      });
  }, [match.params.driverId]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonItem className='toolbar-item' key={seasonDetails?.season}>
            <div slot="start" className={`driver-number ion-margin-end team-${seasonDetails?.DriverStandings[0].Constructors[0].constructorId}`}>{seasonDetails?.DriverStandings[0].Driver.permanentNumber}</div>
            <IonLabel>
              <p>{seasonDetails?.DriverStandings[0].Driver.givenName}</p>
              <h2 className="font-weight-bold ion-text-uppercase">{seasonDetails?.DriverStandings[0].Driver.familyName}</h2>
            </IonLabel>
            <IonThumbnail slot="end" className="country-thumbnail">
              <IonImg src={`assets/img/flags/${seasonDetails?.DriverStandings[0].Driver.nationality}.svg`} alt={seasonDetails?.DriverStandings[0].Driver.nationality} />
            </IonThumbnail>
          </IonItem>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment}>
            <IonSegmentButton value="overview">
              <IonLabel>Overview</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="seasons">
              <IonLabel>Seasons</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="bio">
              <IonLabel>Bio</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      {driver && (
        <IonContent>
          <Swiper onSlideChange={onSlideChange} onSwiper={(swiper: SwiperInterface) => setSwiperInstance(swiper)} initialSlide={0} autoHeight={true}>
            <SwiperSlide>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <DriverRacesPodiums driverId={driver[0].DriverStandings[0].Driver.driverId} />
                    <IonList key={seasonDetails?.season}>
                      <IonListHeader>
                        <IonLabel className="ion-text-left">{seasonDetails?.season} Team</IonLabel>
                      </IonListHeader>
                      <IonItem button routerLink={`/constructor/${seasonDetails?.DriverStandings[0].Constructors[0].constructorId}/${seasonDetails?.season}`}>
                        <IonIcon lazy className="ion-margin-end" src={`assets/img/constructors/${seasonDetails?.DriverStandings[0].Constructors[0].constructorId}.svg`} />
                        <IonLabel>
                          {seasonDetails?.DriverStandings[0].Constructors[0].name}
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </SwiperSlide>
            <SwiperSlide>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonList lines="full">
                      {driver.map(season =>
                        <IonItem key={season.season} lines="full" button routerLink={`/driverresults/${season.season}/${season.DriverStandings[0].Driver.driverId}`}>
                          <div className="standings-position ion-text-center font-weight-bold ion-margin-end">
                            {season.season}
                          </div>
                          <div className={`team-line ion-margin-end team-${season.DriverStandings[0].Constructors[0].constructorId}`}></div>
                          <IonLabel>
                            <h2 className="font-weight-bold">P{season.DriverStandings[0].position}</h2>
                            <p>{season.DriverStandings[0].Constructors[0].name} - {season.round} races</p>
                          </IonLabel>
                          <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{season.DriverStandings[0].points}</IonBadge>
                        </IonItem>
                      )}
                    </IonList>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </SwiperSlide>
            <SwiperSlide>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem lines="full">
                      <IonThumbnail slot="start" className="country-thumbnail ion-margin-end">
                        <IonImg src={`assets/img/flags/${driver[0].DriverStandings[0].Driver.nationality}.svg`} alt={driver[0].DriverStandings[0].Driver.nationality} />
                      </IonThumbnail>
                      <IonLabel>
                        <p>Nationality</p>
                        <h2 className="font-weight-bold">{driver[0].DriverStandings[0].Driver.nationality}</h2>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="full">
                      <IonIcon slot="start" className="ion-margin-end" icon={giftOutline}></IonIcon>
                      <IonLabel>
                        <p>Age</p>
                        <h2 className="font-weight-bold">{new Date().getFullYear() - new Date(driver[0].DriverStandings[0].Driver.dateOfBirth).getFullYear()}</h2>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="full">
                      <IonIcon slot="start" className="ion-margin-end" icon={todayOutline}></IonIcon>
                      <IonLabel>
                        <p>Date of birth</p>
                        <h2 className="font-weight-bold">{new Intl.DateTimeFormat('en-GB').format(new Date(driver[0].DriverStandings[0].Driver.dateOfBirth))}</h2>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonIcon slot="start" className="ion-align-self-start ion-margin-end" icon={readerOutline}></IonIcon>
                      <IonLabel className='preline'>
                        <p>Biography</p>
                        <h2>{description?.replace(/\. /g, '. \n\n')}</h2>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </SwiperSlide>
          </Swiper>
        </IonContent>
      )}
    </IonPage>
  );
};

export default DriverDetails;
