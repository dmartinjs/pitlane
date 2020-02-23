import { Component, Host, h, State } from '@stencil/core';

interface Race {
  season?:   string;
  round?:    string;
  url?:      string;
  raceName?: string;
  Circuit?:  Circuit;
  date?:     Date;
  time?:     string;
}

interface Circuit {
  circuitId?:   string;
  url?:         string;
  circuitName?: string;
  Location?:    Location;
}

interface Location {
  lat?:      string;
  long?:     string;
  locality?: string;
  country?:  string;
}

@Component({
  tag: 'next-race',
  styleUrl: 'next-race.css',
  shadow: true
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
          ? <ion-card>
              <ion-card-header>
                <ion-card-subtitle>
                  {this.race.date}
                </ion-card-subtitle>
                <ion-card-title>
                  {this.race.raceName}
                </ion-card-title>
              </ion-card-header>
            </ion-card>
          : <ion-card>
              <ion-card-header>
                <ion-card-subtitle>
                  <ion-skeleton-text animated style={{ height: '15px', width: '30%' }}></ion-skeleton-text>
                </ion-card-subtitle>
                <ion-card-title>
                  <ion-skeleton-text animated style={{ height: '20px', width: '80%' }}></ion-skeleton-text>
                </ion-card-title>
              </ion-card-header>
            </ion-card>
        }
      </Host>
    );
  }
}
