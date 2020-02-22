import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-ranking',
  styleUrl: 'app-ranking.css'
})
export class AppRanking {

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Ranking</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Ranking</ion-title>
          </ion-toolbar>
        </ion-header>
        <driver-ranking></driver-ranking>
      </ion-content>
    ];
  }

}
