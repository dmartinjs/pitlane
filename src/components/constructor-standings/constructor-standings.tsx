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
  tag: 'constructor-standings',
  styleUrl: 'constructor-standings.css',
  shadow: true
})
export class ConstructorStandings {

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
    return (
      <Host>
        <ion-list>
          {this.constructors.map(constructorStanding => 
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
