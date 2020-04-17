import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>F1rst</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="home ion-padding">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">F1rst</ion-title>
          </ion-toolbar>
        </ion-header>

        <next-race></next-race>

        <h2 class="home-title">Driver Ranking</h2>
        <driver-rank limit={3}></driver-rank>

        <h2 class="home-title">Constructor Ranking</h2>
        <constructor-rank limit={3}></constructor-rank>
      </ion-content>
    ];
  }
}
