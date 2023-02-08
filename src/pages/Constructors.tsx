import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import ConstructorStandings from '../components/constructor/ConstructorStandings/ConstructorStandings';
import { RouteComponentProps } from 'react-router';

interface ConstructorsProps extends RouteComponentProps<{
  season: string,
}> {}

const Constructors: React.FC<ConstructorsProps> = ({match}) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Constructors</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon slot="icon-only" icon={optionsOutline} aria-label="settings"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ConstructorStandings season={match.params.season}/>
      </IonContent>
    </IonPage>
  );
};

export default Constructors;
