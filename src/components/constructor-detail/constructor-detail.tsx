import { Component, h, State, Prop, Host } from '@stencil/core';
import { ConstructorStandingsLists } from '../../models';

@Component({
  tag: 'constructor-detail',
})
export class ConstructorDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() constructorData?: ConstructorStandingsLists;

  /**
   * Id of the constructor
   */
  @Prop() constructorId?: string;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/constructors/${this.constructorId}/constructorStandings.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.constructorData = result.MRData.StandingsTable.StandingsLists[0];
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      );
  }

  render() {
    return (
      <Host>
        <ion-header translucent>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/ranks"></ion-back-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        {this.isLoaded && this.constructorData
          ? (
            <ion-content class="ion-padding">
              <h1><strong class="ion-text-uppercase">{this.constructorData.ConstructorStandings[0].Constructor.name}</strong></h1>

              <h2><strong>{this.constructorData.season}</strong> Season</h2>
              <ion-grid class="ion-no-padding ion-margin-bottom">
                <ion-row>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">POSITION</p>
                    <h3>{this.constructorData.ConstructorStandings[0].position}</h3>
                  </ion-col>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">POINTS</p>
                    <h3>{this.constructorData.ConstructorStandings[0].points}</h3>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">RACES</p>
                    <h3>{this.constructorData.round}</h3>
                  </ion-col>
                  <ion-col>
                    <p class="ion-no-margin ion-padding-bottom">WINS</p>
                    <h3>{this.constructorData.ConstructorStandings[0].wins}</h3>
                  </ion-col>
                </ion-row>
              </ion-grid>
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
