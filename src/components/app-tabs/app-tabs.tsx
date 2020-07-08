import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-tabs',
})
export class AppTabs {

  render() {
    return (
      <Host>
        <ion-tabs>
          <ion-tab tab="tab-home" component="app-home"/>
          <ion-tab tab="tab-races" component="app-races"/>
          <ion-tab tab="tab-ranks" component="app-ranks"/>

          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="tab-home">
              <ion-icon name="newspaper-outline" />
              <ion-label>News</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="tab-ranks">
              <ion-icon name="podium-outline" />
              <ion-label>Standings</ion-label>
            </ion-tab-button>
            <ion-tab-button tab="tab-races">
              <ion-icon name="flag-outline" />
              <ion-label>Races</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </Host>
    );
  }

}
