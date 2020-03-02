import { Component, h, Prop, State } from '@stencil/core';

interface Driver {
  driverId?:        string;
  permanentNumber?: string;
  code?:            string;
  url?:             string;
  givenName?:       string;
  familyName?:      string;
  dateOfBirth?:     Date;
  nationality?:     string;
}

@Component({
  tag: 'driver-detail',
  styleUrl: 'driver-detail.css'
})
export class DriverDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() driver: Driver = {};

  @Prop() driverId;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/drivers/${this.driverId}.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.driver = result.MRData.DriverTable.Drivers[0];
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      )
  }

  render() {
    return [
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/ranks"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <h1>{this.driver.givenName} {this.driver.familyName}</h1>
      </ion-content>
    ];
  }
}
