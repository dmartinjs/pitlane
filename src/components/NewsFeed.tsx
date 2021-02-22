import React from 'react';
import { IonItem, IonThumbnail, IonLabel, IonList, IonListHeader } from '@ionic/react';

const NewsFeed: React.FC = () => {
  

  return (
    <IonList lines="inset">
      <IonListHeader>Latest News</IonListHeader>
      <IonItem button detail href="https://www.motorsport.com/f1/news/ricciardo-f1-seat-fit-woes-behind-me-at-mclaren/5450206/">
        <IonThumbnail slot="start">
          <img src="https://cdn-1.motorsport.com/images/amp/YEQA4vPY/s6/daniel-ricciardo-mclaren-1.jpg" alt=""/>
        </IonThumbnail>
        <IonLabel className="ion-text-wrap ion-margin-end">
          Ricciardo at "the limit" for McLaren F1 cockpit 
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default NewsFeed;