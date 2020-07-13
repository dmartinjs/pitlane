import { Component, h, Prop, State, Host } from '@stencil/core';
import { CircuitTable } from '../../models';

@Component({
  tag: 'race-detail',
  assetsDirs: ['circuits'],
})
export class RaceDetail {

  /**
   * Year of the season
   */
  @Prop() season?: string;

  /**
   * Number of the round
   */
  @Prop() round?: string;

  /**
   * Id of the circuit
   */
  @Prop() circuitId?: string;

  @State() selectedSegment: string = 'race';

  @State() error = null;

  @State() isLoaded = false;

  @State() race?: CircuitTable;

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
            <ion-title>{this.race && this.race.Circuits[0].Location.country} {this.race && this.race.season}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
        </ion-content>
      </Host>
    );
  }

}
