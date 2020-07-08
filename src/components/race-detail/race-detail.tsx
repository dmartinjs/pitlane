import { Component, h, Prop, State, Host, getAssetPath } from '@stencil/core';
import { CircuitTable } from '../../models';

@Component({
  tag: 'race-detail',
  assetsDirs: ['circuits'],
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

        {this.isLoaded && this.race
          ? (
            <ion-content class="ion-padding">
              <h1><strong>{this.race.Circuits[0].Location.country}</strong> {this.race.season}</h1>
              <p>{this.race.Circuits[0].circuitName}</p>
              <ion-img src={getAssetPath(`./circuits/${this.race.Circuits[0].circuitId}.svg`)} alt={this.race.Circuits[0].circuitName}></ion-img>
            </ion-content>
          )
          : (
            <ion-content class="ion-padding">
              <ion-skeleton-text animated style={{ height: '16px', width: '100%' }}></ion-skeleton-text>
            </ion-content>
          )}
      </Host>
    );
  }

}
