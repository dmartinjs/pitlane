import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonThumbnail, IonIcon, IonImg, IonSegment, IonSegmentButton, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { ConstructorStandingsLists, Driver } from '../../models';
import './ConstructorDetails.css';
import { slideOptions } from '../../utils/SlideOptions';
import { readerOutline, todayOutline } from 'ionicons/icons';

interface ConstructorDetailsProps extends RouteComponentProps<{
  constructorId: string,
}> {}

const ConstructorDetails: React.FC<ConstructorDetailsProps> = ({match}) => {
  const [constructor, setConstructor] = useState<ConstructorStandingsLists | null>(null);
  const [drivers, setDrivers] = useState<[Driver] | null>(null);
  const [season, setSeason] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [selectedSegment, SetSelectedSegment] = useState<string>('stats');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'stats':
        slider.current!.slideTo(0);
        break;
      case 'drivers':
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
          SetSelectedSegment('drivers');
          break;
        case 2:
          SetSelectedSegment('bio');
          break;
      }
    })
  }

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/current/constructors/${match.params.constructorId}/constructorStandings.json`)
      .then(res => res.json())
      .then(result => {

        fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=xml&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.url.split('/').pop()}`)
          .then(res => res.text())
          .then(result => {
            const xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            setDescription((xmlDoc.querySelector("extract") as HTMLElement).textContent);
          });

        return setConstructor(result.MRData.StandingsTable.StandingsLists[0]);
      });

    fetch(`https://ergast.com/api/f1/current/constructors/${match.params.constructorId}/drivers.json`)
      .then(res => res.json())
      .then(result => setDrivers(result.MRData.DriverTable.Drivers));

    fetch(`https://ergast.com/api/f1/constructors/${match.params.constructorId}/seasons.json`)
      .then(res => res.json())
      .then(result => setSeason(result.MRData.SeasonTable.Seasons[0].season));
  }, [match.params.constructorId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
        {constructor && (
          <IonItem className='toolbar-item'>
            <IonIcon lazy slot="start" size="large" className="constructor ion-margin-end" src={`assets/img/constructors/${constructor.ConstructorStandings[0].Constructor.constructorId}.svg`}/>
            <IonLabel>
              <h2 className="font-weight-bold">{constructor.ConstructorStandings[0].Constructor.name}</h2>
            </IonLabel>
            <IonThumbnail slot="end" className="country-thumbnail">
              <IonImg src={`assets/img/flags/${constructor.ConstructorStandings[0].Constructor.nationality}.svg`} alt={constructor.ConstructorStandings[0].Constructor.nationality}/>
            </IonThumbnail>
          </IonItem>
        )}
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment}>
            <IonSegmentButton value="stats">
              <IonLabel>Stats</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="drivers">
              <IonLabel>Drivers</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="bio">
              <IonLabel>Bio</IonLabel>
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
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
            <IonGrid>
              <IonRow>
                {drivers && constructor && drivers.slice(0, 2).map(driver =>
                  <IonCol>
                    <IonRow>
                      <IonCol>
                        <IonItem button lines='full' routerLink={`/driver/${driver.driverId}`} key={driver.driverId}>
                          <div slot="start" className={`driver-number driver-details-number ion-margin-end driver-${constructor.ConstructorStandings[0].Constructor.constructorId}`}>{driver.permanentNumber}</div>
                          <IonLabel>
                            <p>{driver.givenName}</p>
                            <h2 className="font-weight-bold ion-text-uppercase">{driver.familyName}</h2>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                )}
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  {constructor &&
                    <>
                      <IonItem lines="full">
                        <IonThumbnail slot="start" className="country-thumbnail ion-margin-end">
                          <IonImg src={`assets/img/flags/${constructor.ConstructorStandings[0].Constructor.nationality}.svg`} alt={constructor.ConstructorStandings[0].Constructor.nationality}/>
                        </IonThumbnail>
                        <IonLabel>
                          <p>Nationality</p>
                          <h2 className="font-weight-bold">{constructor.ConstructorStandings[0].Constructor.nationality}</h2>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" className="ion-align-self-start ion-margin-end" icon={todayOutline}></IonIcon>
                        <IonLabel className='preline'>
                          <p>First Team Entry</p>
                          <h2>{season}</h2>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" className="ion-align-self-start ion-margin-end" icon={readerOutline}></IonIcon>
                        <IonLabel className='preline'>
                          <p>Biography</p>
                          <h2>{description?.replaceAll('. ', '. \n\n')}</h2>
                        </IonLabel>
                      </IonItem>
                    </>
                  }
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default ConstructorDetails;
