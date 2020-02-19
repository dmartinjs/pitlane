import { Component, Host, h, Prop, State } from '@stencil/core';

export interface DriverStanding {
  position?:     string;
  positionText?: string;
  points?:       string;
  wins?:         string;
  Driver?:       DriverClass;
  Constructors?: Constructor[];
}

export interface Constructor {
  constructorId?: string;
  url?:           string;
  name?:          string;
  nationality?:   string;
}

export interface DriverClass {
  driverId?:        string;
  permanentNumber?: string;
  code?:            string;
  url?:             string;
  givenName?:       string;
  familyName?:      string;
  dateOfBirth?:     Date;
  nationality?:     string;
}

@Component({
  tag: 'driver-ranking',
  styleUrl: 'driver-ranking.css',
  shadow: true
})
export class DriverRanking {

  @Prop() listLength: number;

  @State() error = null;

  @State() isLoaded = false;

  @State() driver: Array<DriverStanding> = [];

  componentDidLoad() {
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.driver = result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      )
  }

  render() {
    const driver = this.listLength ? this.driver.slice(0, this.listLength) : this.driver;

    return (
      <Host>
        <ion-list>
          {driver.map(DriverStanding => 
            <ion-item>
              <ion-label>
                {DriverStanding.position} - {DriverStanding.Driver.givenName} {DriverStanding.Driver.familyName}
                </ion-label>
              <ion-note slot="end" color="primary">{DriverStanding.points}</ion-note>
            </ion-item>
          )}
        </ion-list>
      </Host>
    );
  }

}
