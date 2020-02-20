import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>F1rst</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <h2 class="home-title">Next Race</h2>
        <next-race></next-race>

        <ion-grid>
          <ion-row>
            <ion-col>
              <h2 class="ion-padding-top">Driver Ranking</h2>
              <driver-ranking></driver-ranking>
            </ion-col>
            <ion-col>
              <h2 class="ion-padding-top">Constructor Ranking</h2>
              <constructor-ranking></constructor-ranking>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
