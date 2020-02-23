import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-standings',
  styleUrl: 'app-standings.css'
})
export class AppStandings {

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Standings</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Standings</ion-title>
          </ion-toolbar>
        </ion-header>
        <driver-standings></driver-standings>
      </ion-content>
    ];
  }

}
