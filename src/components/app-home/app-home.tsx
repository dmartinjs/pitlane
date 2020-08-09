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
            <ion-title>f1</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="home">
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">f1</ion-title>
            </ion-toolbar>
          </ion-header>
          <race-preview></race-preview>
        </ion-content>
      </Host>
    );
  }
}
