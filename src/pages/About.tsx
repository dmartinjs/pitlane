import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { pricetag, person, logoGithub, receipt } from 'ionicons/icons';

const About: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/settings"></IonBackButton>
            </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonImg className="app-icon" src="assets/icon/android-chrome-512x512.png" />
        <IonList>
          <IonItem>
            <IonIcon slot="start" icon={pricetag} />
            <IonLabel>
              <h2>Version</h2>
              <p>1.0.0</p>
            </IonLabel>
          </IonItem>
          <IonItem button href="https://github.com/dmartinjs" target="_blank">
            <IonIcon slot="start" icon={person} />
            <IonLabel>
            <h2>Maintainer</h2>
            <p>dmartinjs</p>
            </IonLabel>
          </IonItem>
          <IonItem button href="https://github.com/dmartinjs/pitlane" target="_blank">
            <IonIcon slot="start" icon={logoGithub} />
            <IonLabel>
              <h2>Source code</h2>
              <p>https://github.com/dmartinjs/pitlane</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={receipt} />
            <IonLabel>
              <h2>License</h2>
              <p>AGPL-3.0</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
