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
                  <div slot="start" class="ion-align-items-center">
                    {driver.position}
                  </div>
                  <ion-label>
                    <h3>{driver.Driver.givenName} <strong class="ion-text-uppercase">{driver.Driver.familyName}</strong></h3>
                    <p>{driver.Constructors[0].name}</p>
                  </ion-label>
                  <ion-badge color="medium" slot="end">{driver.points} PTS</ion-badge>
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
