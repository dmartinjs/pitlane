import { Component, Host, h, State, Prop } from '@stencil/core';
import { QualifyingResult } from '../../models';

@Component({
  tag: 'qualifying-results',
})
export class QualifyingResults {

  /**
   * Id of the circuit
   */
  @Prop() circuitId?: string;

  @State() error = null;

  @State() isLoaded = false;

  @State() results?: Array<QualifyingResult>;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/circuits/${this.circuitId}/qualifying.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.results = result.MRData.RaceTable.Races[0].QualifyingResults;
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
                <ion-col>
                  Q1
                </ion-col>
                <ion-col>
                  Q2
                </ion-col>
                <ion-col>
                  Q3
                </ion-col>
              </ion-row>
              {this.results && this.results.map(result =>
                <ion-row>
                  <ion-col size="2">{result.position}</ion-col>
                  <ion-col>
                    <strong class="ion-text-uppercase">{result.Driver.code}</strong>
                  </ion-col>
                  <ion-col>
                    <ion-badge color="medium">{result.Q1}</ion-badge>
                  </ion-col>
                  <ion-col>
                    <ion-badge color="medium">{result.Q2}</ion-badge>
                  </ion-col>
                  <ion-col>
                    <ion-badge color="medium">{result.Q3}</ion-badge>
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
