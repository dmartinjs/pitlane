import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
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
            <ion-route url="/ranking" component="tab-ranking">
              <ion-route component="app-ranking"/>
            </ion-route>
          </ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
