import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-ranks',
  styleUrl: 'app-ranks.css'
})
export class AppRanks {

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Ranks</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Ranks</ion-title>
          </ion-toolbar>
        </ion-header>
        <driver-rank></driver-rank>
      </ion-content>
    ];
  }

}
