import { Component, h, Prop, State, Host } from '@stencil/core';
import { StandingsLists } from '../../models';

@Component({
  tag: 'driver-detail',
})
export class DriverDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() driver?: StandingsLists;

  /**
   * Id of the driver
   */
  @Prop() driverId?: string;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/drivers/${this.driverId}/driverStandings.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.driver = result.MRData.StandingsTable.StandingsLists[0];
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      );
  }

  render() {
    const birthday = this.driver && new Intl.DateTimeFormat('en-GB').format(new Date(this.driver.DriverStandings[0].Driver.dateOfBirth));

    return (
      <Host>
        <ion-header translucent>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/ranks"></ion-back-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,

        {this.isLoaded && this.driver
          ? (
            <ion-content class="ion-padding">
              <h1><strong>{this.driver.DriverStandings[0].Driver.givenName} <span class="ion-text-uppercase">{this.driver.DriverStandings[0].Driver.familyName}</span></strong></h1>
              <p class="ion-padding-bottom">{this.driver.DriverStandings[0].Driver.permanentNumber} | {this.driver.DriverStandings[0].Constructors[0].name}</p>

              <h2><strong>{this.driver.season}</strong> Season</h2>
              <ion-grid class="ion-no-padding ion-margin-bottom">
                <ion-row>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">POSITION</p>
                    <h3>{this.driver.DriverStandings[0].position}</h3>
                  </ion-col>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">POINTS</p>
                    <h3>{this.driver.DriverStandings[0].points}</h3>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">RACES</p>
                    <h3>{this.driver.round}</h3>
                  </ion-col>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">WINS</p>
                    <h3>{this.driver.DriverStandings[0].wins}</h3>
                  </ion-col>
                </ion-row>
              </ion-grid>

              <h2><strong>Team</strong></h2>
              <ion-item color="dark" class="ion-margin-bottom" button detail href={`/constructor/${this.driver.DriverStandings[0].Constructors[0].constructorId}`}>
                <ion-label>
                  {this.driver.DriverStandings[0].Constructors[0].name}
                </ion-label>
              </ion-item>

              <h2 class="ion-padding-top"><strong>Personal informations</strong></h2>
              <ion-item>
                <ion-label>
                  <p>Country</p>
                  <h3>{this.driver.DriverStandings[0].Driver.nationality}</h3>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <p>Date of birth</p>
                  <h3>{birthday}</h3>
                </ion-label>
              </ion-item>
            </ion-content>
          )
          : (
            <ion-content class="ion-padding">
              <ion-skeleton-text animated style={{ height: '16px', width: '100%' }}></ion-skeleton-text>
            </ion-content>
          )}
      </Host>
    );
  }
}
