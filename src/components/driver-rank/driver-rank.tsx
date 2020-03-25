import { Component, Host, h, State } from '@stencil/core';
import { DriverStanding } from '../../models';

@Component({
  tag: 'driver-rank',
  styleUrl: 'driver-rank.css',
  shadow: true
})
export class DriverRank {

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

  showDetail(driverId) {
    const nav = document.querySelector('ion-nav');
    nav.push('driver-detail', { driverId });
  }

  render() {
    return (
      <Host>
        { this.isLoaded
          ? <ion-list>
              {this.drivers.map(driver => 
                <ion-item button onClick={() => this.showDetail(driver.Driver.driverId)}>
                  <ion-label>
                    <h3>{driver.position} - {driver.Driver.givenName} {driver.Driver.familyName}</h3>
                    <p>{driver.Constructors[0].name}</p>
                  </ion-label>
                  <ion-note slot="end">{driver.points}</ion-note>
                </ion-item>
              )}
            </ion-list>
          : <ion-list>
              {[...Array(20)].map(() => 
                <ion-item>
                  <ion-label>
                    <ion-skeleton-text animated style={{ height: '16px', width: '100%' }}></ion-skeleton-text>
                  </ion-label>
                </ion-item>
              )}
            </ion-list>
        }
      </Host>
    );
  }
}
