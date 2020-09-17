import { Component, Host, h, State } from '@stencil/core';
import { Race } from '../../models';

@Component({
  tag: 'race-preview',
})
export class RacePreview {

  @State() error = null;

  @State() isLoaded = false;

  @State() race?: Race;

  componentDidLoad() {
    fetch('https://ergast.com/api/f1/current/next.json')
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
    const raceDate = this.race && new Intl.DateTimeFormat('en-GB', {day: "numeric", month: "short"}).format(new Date(this.race.date));

    return (
      <Host>
        {this.isLoaded && this.race
          ? (
            <ion-card href={`/race/${this.race.season}/${this.race.round}`}>
              <ion-card-header>
                <ion-card-subtitle>
                  {raceDate}
                </ion-card-subtitle>
                <ion-card-title>
                  {this.race.Circuit.Location.country} {this.race.season}
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                {this.race.Circuit.circuitName}
              </ion-card-content>
            </ion-card>)
          : (
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>
                  <ion-skeleton-text animated style={{ height: '10px', width: '30%' }}></ion-skeleton-text>
                </ion-card-subtitle>
                <ion-card-title>
                  <ion-skeleton-text animated style={{ height: '26px', width: '50%' }}></ion-skeleton-text>
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-skeleton-text animated style={{ height: '10px', width: '60%' }}></ion-skeleton-text>
              </ion-card-content>
            </ion-card>
          )}
      </Host>
    );
  }

}
