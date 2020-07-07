import { Component, h, Host, State, Listen } from '@stencil/core';

@Component({
  tag: 'app-races',
})
export class AppRace {

  @State() selectedSegment: string = 'upcoming';

  @Listen('ionChange')
  handleChange(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>Races</ion-title>
          </ion-toolbar>
          <ion-toolbar>
            <ion-segment value="upcoming">
              <ion-segment-button value="upcoming">
                <ion-label>Upcoming</ion-label>
              </ion-segment-button>
              <ion-segment-button value="past">
                <ion-label>Past</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-header collapse="condense">
            <ion-toolbar>
              <ion-title size="large">Races</ion-title>
            </ion-toolbar>
          </ion-header>
          {this.selectedSegment == "upcoming" && <race-list></race-list>}
          {this.selectedSegment == "past" && <race-results></race-results>}
        </ion-content>
      </Host>
    );
  }

}
