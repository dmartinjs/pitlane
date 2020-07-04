import { Component, Host, h, State, Prop } from '@stencil/core';
import { ConstructorStanding } from '../../models';

@Component({
  tag: 'constructor-rank'
})
export class ConstructorRank {

  @State() error = null;

  @State() isLoaded = false;

  @State() constructors?: Array<ConstructorStanding>;

  @Prop() limit?: number;

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
      )
  }

  showDetail(constructorId: string) {
    const nav = document.querySelector('ion-nav') as HTMLIonNavElement;
    nav.push('constructor-detail', { constructorId });
  }

  render() {
    const constructors = this.limit && this.constructors ? this.constructors.slice(0, this.limit) : this.constructors;
    const constructorsLength = this.limit ? this.limit : 10;

    return (
      <Host>
        { this.isLoaded
          ? <ion-list>
              {constructors && constructors.map(constructor => 
                <ion-item button onClick={() => this.showDetail(constructor.Constructor.constructorId)}>
                  <ion-avatar slot="start">
                    <ion-img src={`./${constructor.Constructor.constructorId}.png`}/>
                  </ion-avatar>
                  <ion-label>
                    <h3>{constructor.position} - {constructor.Constructor.name}</h3>
                    <p>{constructor.Constructor.nationality}</p>
                  </ion-label>
                  <ion-note slot="end">{constructor.points}</ion-note>
                </ion-item>
              )}
            </ion-list>
          : <ion-list>
              {[...Array(constructorsLength)].map(() => 
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
