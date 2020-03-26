import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route component="app-tabs">
            <ion-route url="/" component="tab-home">
              <ion-route component="app-home"/>
            </ion-route>
            <ion-route url="/races" component="tab-races">
              <ion-route component="app-races"/>
            </ion-route>
            <ion-route url="/ranks" component="tab-ranks">
              <ion-route component="app-ranks"/>
            </ion-route>
          </ion-route>
          <ion-route url="/race/:circuitId" component="race-detail"></ion-route>
          <ion-route url="/driver/:driverId" component="driver-detail"></ion-route>
          <ion-route url="/constructor/:constructorId" component="constructor-detail"></ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
