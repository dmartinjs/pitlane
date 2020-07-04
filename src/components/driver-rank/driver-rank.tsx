import { Component, Host, h, State, Prop } from '@stencil/core';
import { DriverStanding } from '../../models';

@Component({
  tag: 'driver-rank',
})
export class DriverRank {

  @State() error = null;

  @State() isLoaded = false;

  @State() drivers?: Array<DriverStanding>;

  /**
   * Number of constructors displayed
   */
  @Prop() limit: number = 20;

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
      );
  }

  private _handleClick(driverId: string) {
    const nav = document.querySelector('ion-nav') as HTMLIonNavElement;
    nav.push('driver-detail', { driverId });
  }

  render() {
    const drivers = this.limit !== null && this.drivers ? this.drivers.slice(0, this.limit) : this.drivers;

    return (
      <Host>
        {this.isLoaded
          ? (
            <ion-list>
              {drivers && drivers.map(driver =>
                <ion-item button onClick={() => this._handleClick(driver.Driver.driverId)}>
                  <ion-avatar slot="start">
                    <ion-img src={`./${driver.Driver.driverId}.png`}/>
                  </ion-avatar>
                  <ion-label>
                    <h3>{driver.position} - {driver.Driver.givenName} {driver.Driver.familyName}</h3>
                    <p>{driver.Constructors[0].name}</p>
                  </ion-label>
                  <ion-note slot="end">{driver.points}</ion-note>
                </ion-item>
              )}
            </ion-list>)
          : (
            <ion-list>
              {[...Array(this.limit)].map(() =>
                <ion-item>
                  <ion-label>
                    <ion-skeleton-text animated style={{ height: '16px', width: '100%' }}></ion-skeleton-text>
                  </ion-label>
                </ion-item>
              )}
            </ion-list>
          )}
      </Host>
    );
  }
}
