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

        <h2 class="home-title ion-padding-top">Driver Ranking</h2>
        <driver-ranking list-length="3"></driver-ranking>

        <h2 class="home-title ion-padding-top">Constructor Ranking</h2>
        <constructor-ranking list-length="3"></constructor-ranking>
      </ion-content>
    ];
  }
}
