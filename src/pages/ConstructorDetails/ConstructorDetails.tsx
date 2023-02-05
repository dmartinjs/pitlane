import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonThumbnail, IonIcon, IonImg, IonSegment, IonSegmentButton, IonSlides, IonSlide, IonGrid, IonRow, IonCol, IonBadge } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { ConstructorStandingsLists } from '../../models';
import './ConstructorDetails.css';
import { slideOptions } from '../../utils/SlideOptions';
import { readerOutline, todayOutline } from 'ionicons/icons';

interface ConstructorDetailsProps extends RouteComponentProps<{
  constructorId: string,
}> { }

const ConstructorDetails: React.FC<ConstructorDetailsProps> = ({ match }) => {
  const [constructor, setConstructor] = useState<[ConstructorStandingsLists] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [selectedSegment, SetSelectedSegment] = useState<string>('stats');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch (event.detail.value) {
      case 'stats':
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
      switch (value) {
        case 0:
          SetSelectedSegment('stats');
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
    fetch(`https://ergast.com/api/f1/constructors/${match.params.constructorId}/constructorStandings.json?limit=500`)
      .then(res => res.json())
      .then(result => {

        fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=xml&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.url.split('/').pop()}`)
          .then(res => res.text())
          .then(result => {
            const xmlDoc = new DOMParser().parseFromString(result, "text/xml");
            setDescription((xmlDoc.querySelector("extract") as HTMLElement).textContent);
          });

        return setConstructor(result.MRData.StandingsTable.StandingsLists.reverse());
      });
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
              <IonIcon lazy slot="start" size="large" className="constructor ion-margin-end" src={`assets/img/constructors/${constructor[0].ConstructorStandings[0].Constructor.constructorId}.svg`} />
              <IonLabel>
                <h2 className="font-weight-bold">{constructor[0].ConstructorStandings[0].Constructor.name}</h2>
              </IonLabel>
              <IonThumbnail slot="end" className="country-thumbnail">
                <IonImg src={`assets/img/flags/${constructor[0].ConstructorStandings[0].Constructor.nationality}.svg`} alt={constructor[0].ConstructorStandings[0].Constructor.nationality} />
              </IonThumbnail>
            </IonItem>
          )}
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment}>
            <IonSegmentButton value="stats">
              <IonLabel>Stats</IonLabel>
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
                <IonCol>
                  {constructor && constructor.map(season => 
                    <IonItem key={season.season} lines="full" button routerLink={`/constructor-results/${season.season}/${season.ConstructorStandings[0].Constructor.constructorId}`}>
                      <IonLabel>
                        <p>{season.season}</p>
                      </IonLabel>
                      <div className="race-position ion-margin-end font-weight-bold">
                        {season.ConstructorStandings[0].position}
                      </div>
                      <IonBadge className="standings-points" slot="end" color="medium" mode="ios">{season.ConstructorStandings[0].points}</IonBadge>
                    </IonItem>
                  )}
                </IonCol>
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
                          <IonImg src={`assets/img/flags/${constructor[0].ConstructorStandings[0].Constructor.nationality}.svg`} alt={constructor[0].ConstructorStandings[0].Constructor.nationality} />
                        </IonThumbnail>
                        <IonLabel>
                          <p>Nationality</p>
                          <h2 className="font-weight-bold">{constructor[0].ConstructorStandings[0].Constructor.nationality}</h2>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon slot="start" className="ion-align-self-start ion-margin-end" icon={todayOutline}></IonIcon>
                        <IonLabel className='preline'>
                          <p>First Team Entry</p>
                          <h2>{constructor[constructor.length -1].season}</h2>
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
