import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonList, IonIcon, IonThumbnail, IonTitle, IonImg, IonSlides, IonSlide, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { DriverStandingsLists } from '../models';
import { giftOutline, todayOutline } from 'ionicons/icons';
import DriverSeasons from '../components/driver/DriverSeasons';
import DriverRacesPodiums from '../components/driver/DriverAchievements';
import { slideOptions } from '../utils/SlideOptions';

interface DriverDetailsProps extends RouteComponentProps<{
  driverId: string,
  driverGivenName: string,
  driverFamilyName: string
}> {}

const DriverDetails: React.FC<DriverDetailsProps> = ({match}) => {
  const [driver, setDriver] = useState<DriverStandingsLists | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [selectedSegment, SetSelectedSegment] = useState<string>('stats');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'stats':
        slider.current!.slideTo(0);
        break;
      case 'teams':
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
          SetSelectedSegment('stats');
          break;
        case 1:
          SetSelectedSegment('teams');
          break;
        case 2:
          SetSelectedSegment('bio');
          break;
      }
    })
  }

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/current/drivers/${match.params.driverId}/driverStandings.json`)
      .then(res => res.json())
      .then(result => setDriver(result.MRData.StandingsTable.StandingsLists[0]));

    fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=xml&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${match.params.driverGivenName}_${match.params.driverFamilyName}`)
      .then(res => res.text())
      .then(result => {
        const xmlDoc = new DOMParser().parseFromString(result, "text/xml");
        setDescription((xmlDoc.querySelector("extract") as HTMLElement).textContent);
      });
  }, [match.params.driverId, match.params.driverGivenName, match.params.driverFamilyName]);


  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/standings"></IonBackButton>
              <IonTitle>Driver</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {driver && (
          <IonContent>
            <IonList lines="full">
              <IonItem>
                <div slot="start" className={`driver-number ion-margin-end driver-${driver.DriverStandings[0].Constructors[0].constructorId}`}>{driver.DriverStandings[0].Driver.permanentNumber}</div>
                <IonLabel>
                  <p>{driver.DriverStandings[0].Driver.givenName}</p>
                  <h2 className="font-weight-bold ion-text-uppercase">{driver.DriverStandings[0].Driver.familyName}</h2>
                </IonLabel>
                <IonThumbnail slot="end" className="country-thumbnail">
                  <IonImg src={`assets/img/flags/${driver.DriverStandings[0].Driver.nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
                </IonThumbnail>
              </IonItem>
            </IonList>
            <IonSegment onIonChange={onSegmentChange} value={selectedSegment}>
              <IonSegmentButton value="stats">
                <IonLabel>Stats</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="teams">
                <IonLabel>Teams</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="bio">
                <IonLabel>Bio</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <IonSlides onIonSlideDidChange={onSlideChange} ref={slider} options={slideOptions}>
              <IonSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <DriverSeasons driverId={driver.DriverStandings[0].Driver.driverId}/>
                      <DriverRacesPodiums driverId={driver.DriverStandings[0].Driver.driverId}/>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonSlide>
              <IonSlide>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="full" button routerLink={`/constructor/${driver.DriverStandings[0].Constructors[0].constructorId}`}>
                        <IonIcon lazy slot="start" size="large" className="constructor ion-margin-end" src={`assets/img/constructors/${driver.DriverStandings[0].Constructors[0].constructorId}.svg`}/>
                        <IonLabel>
                          <h2 className="font-weight-bold">{driver.DriverStandings[0].Constructors[0].name}</h2>
                        </IonLabel>
                        <IonThumbnail slot="end" className="country-thumbnail">
                          <IonImg src={`assets/img/flags/${driver.DriverStandings[0].Constructors[0].nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
                        </IonThumbnail>
                      </IonItem>
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
                          <IonImg src={`assets/img/flags/${driver.DriverStandings[0].Driver.nationality}.svg`} alt={driver.DriverStandings[0].Driver.nationality}/>
                        </IonThumbnail>
                        <IonLabel>
                          <p>Nationality</p>
                          <h2 className="font-weight-bold">{driver.DriverStandings[0].Driver.nationality}</h2>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="full">
                        <IonIcon slot="start" className="ion-margin-end" icon={giftOutline}></IonIcon>
                        <IonLabel>
                          <p>Age</p>
                          <h2 className="font-weight-bold">{new Date().getFullYear() - new Date(driver.DriverStandings[0].Driver.dateOfBirth).getFullYear()}</h2>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="full">
                        <IonIcon slot="start" className="ion-margin-end" icon={todayOutline}></IonIcon>
                        <IonLabel>
                          <p>Date of birth</p>
                          <h2 className="font-weight-bold">{new Intl.DateTimeFormat('en-GB').format(new Date(driver.DriverStandings[0].Driver.dateOfBirth))}</h2>
                        </IonLabel>
                      </IonItem>
                      <p className="ion-padding ion-text-left">{description}</p>
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
