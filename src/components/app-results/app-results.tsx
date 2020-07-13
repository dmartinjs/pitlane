import { Component, h, Prop, State, Host, Listen } from '@stencil/core';
import { CircuitTable } from '../../models';

@Component({
  tag: 'app-results',
  assetsDirs: ['circuits'],
})
export class AppResults {

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

  @Listen('ionChange')
  handleChange(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

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
          <ion-toolbar>
            <ion-segment value="race">
              <ion-segment-button value="qualifying">
                <ion-label>Qualifying</ion-label>
              </ion-segment-button>
              <ion-segment-button value="race">
                <ion-label>Race</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">{this.race && this.race.Circuits[0].Location.country} {this.race && this.race.season}</ion-title>
            </ion-toolbar>
          </ion-header>
          {this.selectedSegment == "qualifying" && <qualifying-results season={this.season} round={this.round}></qualifying-results>}
          {this.selectedSegment == "race" && <race-results season={this.season} round={this.round}></race-results>}
        </ion-content>
      </Host>
    );
  }

}
