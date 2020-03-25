import { Component, Host, h, State } from '@stencil/core';
import { Race } from '../../models';

@Component({
  tag: 'next-race'
})
export class NextRace {

  @State() error = null;

  @State() isLoaded = false;

  @State() race: Race = {};

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
      )
  }

  render() {
    return (
      <Host>
        {this.isLoaded
          ? <ion-card class="ion-no-margin" href={`/race/${this.race.Circuit.circuitId}`}>
              <ion-card-header>
                <ion-card-subtitle>
                  {this.race.date}
                </ion-card-subtitle>
                <ion-card-title>
                  {this.race.Circuit.Location.country} {this.race.season}
                </ion-card-title>
              </ion-card-header>
              <ion-card-content>
                {this.race.Circuit.circuitName}
              </ion-card-content>
            </ion-card>
          : <ion-card>
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
        }
      </Host>
    );
  }
}
