import { Component, h, Prop, State, Host, Listen } from '@stencil/core';
import { Race } from '../../models';

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

  @State() selectedSegment: string = 'circuit';

  @State() error = null;

  @State() isLoaded = false;

  @State() race?: Race;

  @Listen('ionChange')
  handleChange(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/${this.season}/${this.round}.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.race = result.MRData.RaceTable.Races[0];
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      );
  }

  render() {
    const displayRaceResults = this.race && new Date(this.race.date) < new Date() ? true : false;

    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/races"></ion-back-button>
            </ion-buttons>
            <ion-title>{this.race && this.race.Circuit.Location.country} {this.race && this.race.season}</ion-title>
          </ion-toolbar>
          <ion-toolbar>
            <ion-segment value="circuit">
              <ion-segment-button value="circuit">
                <ion-label>Circuit</ion-label>
              </ion-segment-button>
              <ion-segment-button value="qualifying">
                <ion-label>Qualifying</ion-label>
              </ion-segment-button>
              {displayRaceResults && (
                <ion-segment-button value="race">
                  <ion-label>Race</ion-label>
                </ion-segment-button>
              )}
            </ion-segment>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">{this.race && this.race.Circuit.Location.country} {this.race && this.race.season}</ion-title>
            </ion-toolbar>
          </ion-header>
          {this.selectedSegment == "circuit" && this.race && (
            <ion-item>
              <ion-label>
                <h2><strong>{this.race.Circuit.Location.country}</strong> {this.race.season}</h2>
                <h3>{this.race.Circuit.circuitName}</h3>
              </ion-label>
            </ion-item>
          )}
          {this.selectedSegment == "qualifying" && <qualifying-results season={this.season} round={this.round}></qualifying-results>}
          {this.selectedSegment == "race" && <race-results season={this.season} round={this.round}></race-results>}
        </ion-content>
      </Host>
    );
  }

}
