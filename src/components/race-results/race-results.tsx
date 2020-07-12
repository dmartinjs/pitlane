import { Component, Host, h, State, Prop } from '@stencil/core';
import { Result } from '../../models';

@Component({
  tag: 'race-results',
})
export class RaceResults {

  /**
   * Year of the season
   */
  @Prop() season?: string;

  /**
   * Number of the round
   */
  @Prop() round?: string;

  @State() error = null;

  @State() isLoaded = false;

  @State() results?: Array<Result>;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/${this.season}/${this.round}/results.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.results = result.MRData.RaceTable.Races[0].Results;
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
        {this.isLoaded
          ? (
            <ion-grid>
              <ion-row>
                <ion-col size="2">POS</ion-col>
                <ion-col>
                  DRIVER
                </ion-col>
                <ion-col class="ion-text-center">
                  TIME/RET
                </ion-col>
                <ion-col class="ion-text-center">
                  PTS
                </ion-col>
              </ion-row>
              {this.results && this.results.map(result =>
                <ion-row>
                  <ion-col size="2">
                    <strong>{result.position}</strong>
                  </ion-col>
                  <ion-col>
                    <strong class="ion-text-uppercase">{result.Driver.code}</strong>
                  </ion-col>
                  <ion-col class="ion-text-center">
                    <ion-badge color="medium">{result.Time ? result.Time.time : 'DNF'}</ion-badge>
                  </ion-col>
                  <ion-col class="ion-text-center">
                    <strong>{result.points}</strong>
                  </ion-col>
                </ion-row>
              )}
            </ion-grid>)
          : (
            <ion-grid>
              {[...Array(20)].map(() =>
                <ion-row>
                  <ion-col>
                    <ion-skeleton-text animated style={{ height: '16px', width: '100%' }}></ion-skeleton-text>
                  </ion-col>
                </ion-row>
              )}
            </ion-grid>
          )}
      </Host>
    );
  }

}
