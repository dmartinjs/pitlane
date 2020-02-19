import { Component, Host, h, Prop, State } from '@stencil/core';

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
  tag: 'constructor-ranking',
  styleUrl: 'constructor-ranking.css',
  shadow: true
})
export class ConstructorRanking {

  @Prop() listLength: number;

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

  render() {
    const constructors = this.listLength ? this.constructors.slice(0, this.listLength) : this.constructors;

    return (
      <Host>
        <ion-list>
          {constructors.map(constructorStanding => 
            <ion-item>
              <ion-label>
                {constructorStanding.position} - {constructorStanding.Constructor.name}
                </ion-label>
              <ion-note slot="end" color="primary">{constructorStanding.points}</ion-note>
            </ion-item>
          )}
        </ion-list>
      </Host>
    );
  }

}
