import { Component, Host, h, Prop, State } from '@stencil/core';

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

  @Prop() listLength: number;

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
    const drivers = this.listLength ? this.drivers.slice(0, this.listLength) : this.drivers;

    return (
      <Host>
        <ion-list>
          {drivers.map(driverStanding => 
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
