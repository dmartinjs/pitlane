import React, { useEffect, useState } from 'react';
import { IonItem, IonThumbnail, IonLabel, IonList, IonListHeader, IonImg } from '@ionic/react';

export interface Item {
  title: string;
  link: string;
  enclosure: {
    link: string
  }  
}

const News: React.FC = () => {
  const [feed, setFeed] = useState< [Item] | null>(null);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.motorsport.com%2Frss%2Ff1%2Fnews%2F')
      .then(res => res.json())
      .then(result => {
        setFeed(result.items)
      });
  }, []);

  return (
    <IonList lines="full">
      <IonListHeader>Latest News</IonListHeader>
      {feed && feed.map((item: any, index: any) =>
        <IonItem key={index} button href={item.link.replace(/utm_[^&]+&?/g, '')} rel="noopener" target="_blank">
          <IonThumbnail slot="start">
            <IonImg className="img" src={item.enclosure.link} alt={item.title}/>
          </IonThumbnail>
          <IonLabel className="ion-text-wrap ion-margin-end">
            {item.title}
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default News;