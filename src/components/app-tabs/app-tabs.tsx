import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-tabs'
})
export class AppTabs {

  render() {
    return [
      <ion-tabs>
        <ion-tab tab="tab-home" component="app-home"/>
        <ion-tab tab="tab-standings" component="app-standings"/>

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab-home">
            <ion-icon ios="home" md="home-sharp" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab-standings">
            <ion-icon ios="podium" md="podium-sharp" />
            <ion-label>Standings</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    ];
  }

}
