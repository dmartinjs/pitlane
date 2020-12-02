import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { moonOutline } from 'ionicons/icons';

const Settings: React.FC = () => {

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
          <IonToggle slot="end" name="theme" checked/>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
