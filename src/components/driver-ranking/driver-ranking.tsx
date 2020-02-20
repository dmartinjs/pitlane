import { Component, Host, h, State } from '@stencil/core';

interface DriverStanding {
  position?:     string;
  positionText?: string;
  points?:       string;
  wins?:         string;
  Driver?:       DriverClass;
  Constructors?: Constructor[];
}

interface Constructor {
  constructorId?: string;
  url?:           string;
  name?:          string;
  nationality?:   string;
}

interface DriverClass {
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

  @State() error = null;

  @State() isLoaded = false;

  @State() drivers: Array<DriverStanding> = [];

  componentDidLoad() {
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.drivers = result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
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
        <ion-list>
          {this.drivers.map(driverStanding => 
            <ion-item>
              <ion-label>
                {driverStanding.position} - {driverStanding.Driver.givenName} {driverStanding.Driver.familyName}
                </ion-label>
              <ion-note slot="end" color="primary">{driverStanding.points}</ion-note>
            </ion-item>
          )}
        </ion-list>
      </Host>
    );
  }
}
