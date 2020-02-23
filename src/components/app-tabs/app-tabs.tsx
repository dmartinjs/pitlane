import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-tabs'
})
export class AppTabs {

  render() {
    return [
      <ion-tabs>
        <ion-tab tab="tab-home" component="app-home"/>
        <ion-tab tab="tab-races" component="app-races"/>
        <ion-tab tab="tab-ranks" component="app-ranks"/>

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab-home">
            <ion-icon ios="home" md="home-sharp" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab-races">
            <ion-icon ios="flag" md="flag-sharp" />
            <ion-label>Races</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab-ranks">
            <ion-icon ios="medal" md="medal-sharp" />
            <ion-label>Ranks</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    ];
  }

}
