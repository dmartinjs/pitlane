import { Component, Host, h, State } from '@stencil/core';

interface ConstructorStanding {
  position?:     string;
  positionText?: string;
  points?:       string;
  wins?:         string;
  Constructor?:  Constructor;
}

interface Constructor {
  constructorId?: string;
  url?:           string;
  name?:          string;
  nationality?:   string;
}


@Component({
  tag: 'constructor-rank',
  styleUrl: 'constructor-rank.css',
  shadow: true
})
export class ConstructorRank {

  @State() error = null;

  @State() isLoaded = false;

  @State() constructors: Array<ConstructorStanding> = [];

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

  showDetail(constructorId) {
    const nav = document.querySelector('ion-nav');
    nav.push('constructor-detail', { constructorId });
  }

  render() {
    return (
      <Host>
        { this.isLoaded
          ? <ion-list>
              {this.constructors.map(constructor => 
                <ion-item onClick={() => this.showDetail(constructor.Constructor.constructorId)}>
                  <ion-label>
                    {constructor.position} - {constructor.Constructor.name}
                    </ion-label>
                  <ion-note slot="end" color="primary">{constructor.points}</ion-note>
                </ion-item>
              )}
            </ion-list>
          : <ion-list>
              {[...Array(10)].map(() => 
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
