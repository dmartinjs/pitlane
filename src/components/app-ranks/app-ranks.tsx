import { Component, h, State, Listen, Host } from '@stencil/core';

@Component({
  tag: 'app-ranks',
})
export class AppRanks {

  @State() selectedSegment: string = 'drivers';

  @Listen('ionChange')
  handleChange(event: CustomEvent) {
    this.selectedSegment = event.detail.value;
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>Ranks</ion-title>
          </ion-toolbar>
          <ion-toolbar>
            <ion-segment value="drivers">
              <ion-segment-button value="drivers">
                <ion-label>Drivers</ion-label>
              </ion-segment-button>
              <ion-segment-button value="constructors">
                <ion-label>Constructors</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-toolbar>
        </ion-header>,

        <ion-content>
          {this.selectedSegment == "drivers" && <driver-rank></driver-rank>}
          {this.selectedSegment == "constructors" && <constructor-rank></constructor-rank>}
        </ion-content>
      </Host>
    );
  }

}
