import { Component, h, Prop, State, Host } from '@stencil/core';
import { CircuitTable } from '../../models';

@Component({
  tag: 'race-detail',
})
export class RaceDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() race?: CircuitTable;

  /**
   * Id of the circuit
   */
  @Prop() circuitId?: string;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/circuits/${this.circuitId}.json`)
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
      );
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/races"></ion-back-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <h1>{this.race && `${this.race.Circuits[0].Location.locality} ${this.race.season}`}</h1>
          <p>{this.race && this.race.Circuits[0].circuitName}</p>
        </ion-content>
      </Host>
    );
  }

}
