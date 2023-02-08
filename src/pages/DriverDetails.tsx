import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonIcon, IonThumbnail, IonImg, IonSlides, IonSlide, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonBadge, IonListHeader } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { DriverStandingsLists } from '../models';
import { giftOutline, readerOutline, todayOutline } from 'ionicons/icons';
import DriverRacesPodiums from '../components/driver/DriverAchievements';
import { slideOptions } from '../utils/SlideOptions';

interface DriverDetailsProps extends RouteComponentProps<{
  driverId: string,
  season: string
}> {}

const DriverDetails: React.FC<DriverDetailsProps> = ({match}) => {
  const [driver, setDriver] = useState<DriverStandingsLists[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [selectedSegment, SetSelectedSegment] = useState<string>('overview');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'overview':
        slider.current!.slideTo(0);
        break;
      case 'seasons':
        slider.current!.slideTo(1);
        break;
      case 'bio':
        slider.current!.slideTo(2);
        break;
    }
  }

  const onSlideChange = (event: any) => {
    event.target.getActiveIndex().then((value: any) => {
      switch(value) {
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
    })
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
            {driver && (
              <IonItem className='toolbar-item'>
                <div slot="start" className={`driver-number ion-margin-end driver-${driver[0].DriverStandings[0].Constructors[0].constructorId}`}>{driver[0].DriverStandings[0].Driver.permanentNumber}</div>
                <IonLabel>
                  <p>{driver[0].DriverStandings[0].Driver.givenName}</p>
                  <h2 className="font-weight-bold ion-text-uppercase">{driver[0].DriverStandings[0].Driver.familyName}</h2>
                </IonLabel>
                <IonThumbnail slot="end" className="country-thumbnail">
                  <IonImg src={`assets/img/flags/${driver[0].DriverStandings[0].Driver.nationality}.svg`} alt={driver[0].DriverStandings[0].Driver.nationality}/>
                </IonThumbnail>
              </IonItem>
            )}
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
            <IonSlides onIonSlideDidChange={onSlideChange} ref={slider} options={slideOptions}>
              <IonSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <DriverRacesPodiums driverId={driver[0].DriverStandings[0].Driver.driverId}/>
                        {driver.filter(standing => standing.season === match.params.season ).forEach(standing => {
                          <IonList>
                            <IonListHeader>
                              <IonLabel className="ion-text-left">{standing.season} Team</IonLabel>
                            </IonListHeader>
                            <IonItem button routerLink={`/constructor/${standing.DriverStandings[0].Constructors[0].constructorId}`}>
                              <IonIcon lazy className="ion-margin-end" src={`assets/img/constructors/${standing.DriverStandings[0].Constructors[0].constructorId}.svg`}/>
                              <IonLabel>
                                {standing.DriverStandings[0].Constructors[0].name}
                              </IonLabel>
                            </IonItem>
                          </IonList>
                        })}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonSlide>
              <IonSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonList lines="full">
                        {driver.map(season =>
                          <IonItem key={season.season} lines="full" button routerLink={`/driverresults/${season.season}/${season.DriverStandings[0].Driver.driverId}`}>
                            <IonIcon lazy slot="start" size="large" className="constructor ion-margin-end" src={`assets/img/constructors/${season.DriverStandings[0].Constructors[0].constructorId}.svg`}/>
                            <IonLabel>
                              <p>{season.season}</p>
                              <h2 className="font-weight-bold">{season.DriverStandings[0].Constructors[0].name}</h2>
                            </IonLabel>
                            <div className="race-position ion-margin-end font-weight-bold">
                              P{season.DriverStandings[0].position}
                            </div>
                            <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{season.DriverStandings[0].points}</IonBadge>
                          </IonItem>
                        )}
                      </IonList>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonSlide>
              <IonSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="full">
                        <IonThumbnail slot="start" className="country-thumbnail ion-margin-end">
                          <IonImg src={`assets/img/flags/${driver[0].DriverStandings[0].Driver.nationality}.svg`} alt={driver[0].DriverStandings[0].Driver.nationality}/>
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
                          <h2>{description?.replaceAll('. ', '. \n\n')}</h2>
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonSlide>
            </IonSlides>
          </IonContent>
        )}
    </IonPage>
  );
};

export default DriverDetails;
