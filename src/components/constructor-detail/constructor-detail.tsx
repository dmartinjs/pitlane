import { Component, h, State, Prop } from '@stencil/core';
import { Constructor } from '../../models';

@Component({
  tag: 'constructor-detail'
})
export class ConstructorDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() constructorData?: Constructor;

  @Prop() constructorId?: string;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/constructors/${this.constructorId}.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.constructorData = result.MRData.ConstructorTable.Constructors[0];
        },
        (error) => {
          this.isLoaded = true;
          this.error = error;
        }
      )
  }

  render() {
    return [
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/ranks"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <h1>{this.constructorData && this.constructorData.name}</h1>
      </ion-content>
    ];
  }

}
