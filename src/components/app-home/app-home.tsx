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

      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">F1rst</ion-title>
          </ion-toolbar>
        </ion-header>
        <next-race></next-race>
      </ion-content>
    ];
  }
}
