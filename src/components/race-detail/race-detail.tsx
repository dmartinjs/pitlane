import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'race-detail',
  styleUrl: 'race-detail.css'
})
export class RaceDetail {

  @Prop() race;

  render() {
    return [
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/races"></ion-back-button>
          </ion-buttons>
          <ion-title>{this.race.Circuit.Location.country}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <h1>{this.race.Circuit.Location.locality} {this.race.season}</h1>
        <p>{this.race.Circuit.circuitName}</p>
      </ion-content>
    ];
  }

}
