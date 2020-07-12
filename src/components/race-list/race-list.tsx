import { Component, Host, h, State, Prop } from '@stencil/core';
import { Race } from '../../models';

@Component({
  tag: 'race-list',
})
export class RaceList {

  @State() error = null;

  @State() isLoaded = false;

  @State() races?: Array<Race>;

  /**
   * set to `true` if you want to displaya list of past races
   */
  @Prop() past: boolean = false;

  componentDidLoad() {
    fetch('https://ergast.com/api/f1/current.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.races = result.MRData.RaceTable.Races;
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      );
  }

  private _handleClick(season: string, round: string, circuitId: string) {
    const nav = document.querySelector('ion-nav') as HTMLIonNavElement;
    nav.push('race-detail', { season, round,  circuitId });
  }

  render() {
    const races = this.past ? this.races && this.races.filter(race => new Date(race.date) < new Date()) : this.races && this.races.filter(race => new Date(race.date) > new Date());

    return (
      <Host>
        {this.isLoaded
          ? (
            <ion-list>
              {races && races.map(race =>
                <ion-item button onClick={() => this._handleClick(race.season, race.round, race.Circuit.circuitId)}>
                  <div slot="start" class="ion-text-center">
                    {new Date(race.date).getDate()}<br/>
                    <ion-badge color="medium">{new Date(race.date).toLocaleString('default', { month: 'short' })}</ion-badge>
                  </div>
                  <ion-label>
                    <ion-text color="primary">
                      <p class="ion-text-uppercase">ROUND {race.round}</p>
                    </ion-text>
                    <h2><strong>{race.Circuit.Location.country}</strong></h2>
                    <p>{race.Circuit.circuitName}</p>
                  </ion-label>
                </ion-item>
              )}
            </ion-list>)
          : (
            <ion-list>
              {[...Array(20)].map(() =>
                <ion-item>
                  <ion-label>
                    <h2><ion-skeleton-text animated style={{ height: '17px', width: '25%' }}></ion-skeleton-text></h2>
                    <h3><ion-skeleton-text animated style={{ height: '13px', width: '15%' }}></ion-skeleton-text></h3>
                    <p><ion-skeleton-text animated style={{ height: '16px', width: '55%' }}></ion-skeleton-text></p>
                  </ion-label>
                </ion-item>
              )}
            </ion-list>
          )}
      </Host>
    );
  }
}
