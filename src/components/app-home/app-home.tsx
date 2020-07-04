import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-home',
})
export class AppHome {

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>F1rst</ion-title>
          </ion-toolbar>
        </ion-header>,

        <ion-content class="home">
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">F1rst</ion-title>
            </ion-toolbar>
          </ion-header>

          <next-race></next-race>

          <h2 class="ion-margin-top ion-margin-start">Driver Ranking</h2>
          <driver-rank limit={3}></driver-rank>

          <h2 class="ion-margin-top ion-margin-start">Constructor Ranking</h2>
          <constructor-rank limit={3}></constructor-rank>
        </ion-content>
      </Host>
    );
  }
}
