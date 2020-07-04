import { Component, Host, h, State } from '@stencil/core';
import { Race } from '../../models';

@Component({
  tag: 'race-list',
})
export class RaceList {

  @State() error = null;

  @State() isLoaded = false;

  @State() races?: Array<Race>;

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

  private _handleClick(circuitId: string) {
    const nav = document.querySelector('ion-nav') as HTMLIonNavElement;
    nav.push('race-detail', { circuitId });
  }

  render() {
    return (
      <Host>
        {this.isLoaded
          ? (
            <ion-list>
              {this.races && this.races.map(race =>
                <ion-item button onClick={() => this._handleClick(race.Circuit.circuitId)}>
                  <ion-label>
                    <h2>{race.date}</h2>
                    <h3>{race.Circuit.Location.country}</h3>
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
