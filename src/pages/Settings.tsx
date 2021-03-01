import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { moonOutline, alertCircleOutline, bugOutline } from 'ionicons/icons';

const Settings: React.FC = () => {

  // Listen for the toggle check/uncheck to toggle the dark class on the <body>
  const toggleDarkModeHandler = (ev: CustomEvent) => document.body.classList.toggle('dark', ev.detail.checked);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonIcon slot="start" icon={moonOutline}/>
          <IonLabel>Toggle Dark Theme</IonLabel>
          <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
        </IonItem>

        <IonList>
          <IonListHeader>Project</IonListHeader>
          <IonItem button href="https://github.com/dmartinjs/pitlane/issues" target="_blank" rel="noopener">
            <IonIcon slot="start" icon={bugOutline}/>
            <IonLabel>Report a bug</IonLabel>
          </IonItem>
          <IonItem button href="/about">
            <IonIcon slot="start" icon={alertCircleOutline}/>
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
