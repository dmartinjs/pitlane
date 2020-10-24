import { Component, Host, h, State } from '@stencil/core';
import { ConstructorStanding } from '../../models';

@Component({
  tag: 'constructor-rank',
})
export class ConstructorRank {

  @State() error = null;

  @State() isLoaded = false;

  @State() constructors?: Array<ConstructorStanding>;

  componentDidLoad() {
    fetch('https://ergast.com/api/f1/current/constructorStandings.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.constructors = result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      );
  }

  private _handleClick(constructorId: string) {
    const nav = document.querySelector('ion-nav') as HTMLIonNavElement;
    nav.push('constructor-detail', { constructorId });
  }

  render() {
    const { constructors } = this;

    return (
      <Host>
        {this.isLoaded
          ? (
            <ion-list>
              {constructors && constructors.map(constructor =>
                <ion-item button onClick={() => this._handleClick(constructor.Constructor.constructorId)}>
                  <div slot="start">
                    {constructor.position}
                  </div>
                  <ion-label>
                    <h3>{constructor.Constructor.name}</h3>
                    <p>{constructor.Constructor.nationality}</p>
                  </ion-label>
                  <ion-badge color="medium" slot="end">{constructor.points} PTS</ion-badge>
                </ion-item>
              )}
            </ion-list>)
          : (
            <ion-list>
              {[...Array(10)].map(() =>
                <ion-item>
                  <ion-label>
                    <ion-skeleton-text animated style={{ height: '36px', width: '100%' }}></ion-skeleton-text>
                  </ion-label>
                </ion-item>
              )}
            </ion-list>)}
      </Host>
    );
  }
}
