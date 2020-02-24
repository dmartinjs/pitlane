import { Component, h, Prop, State } from '@stencil/core';

export interface CircuitTable {
  season?:    string;
  circuitId?: string;
  Circuits?:  Circuit[];
}

export interface Circuit {
  circuitId?:   string;
  url?:         string;
  circuitName?: string;
  Location?:    Location;
}

export interface Location {
  lat?:      string;
  long?:     string;
  locality?: string;
  country?:  string;
}

@Component({
  tag: 'race-detail',
  styleUrl: 'race-detail.css'
})
export class RaceDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() race: CircuitTable = {};

  @Prop() circuit;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/circuits/${this.circuit}.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.race = result.MRData.CircuitTable;
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
            <ion-back-button defaultHref="/races"></ion-back-button>
          </ion-buttons>
          <ion-title>{this.race.Circuits[0].Location.country}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <h1>{this.race.Circuits[0].Location.locality} {this.race.season}</h1>
        <p>{this.race.Circuits[0].circuitName}</p>
      </ion-content>
    ];
  }

}
