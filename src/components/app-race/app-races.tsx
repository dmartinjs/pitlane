import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-races',
  styleUrl: 'app-races.css'
})
export class AppRace {

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Race</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Race</ion-title>
          </ion-toolbar>
        </ion-header>
        <race-list></race-list>
      </ion-content>
    ];
  }

}
