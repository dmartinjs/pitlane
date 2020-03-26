import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-races'
})
export class AppRace {

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Races</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Races</ion-title>
          </ion-toolbar>
        </ion-header>
        <race-list></race-list>
      </ion-content>
    ];
  }

}
