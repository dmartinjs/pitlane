import { Component, h, State, Prop } from '@stencil/core';

export interface ConstructorTable {
  season?:        string;
  constructorId?: string;
  Constructors?:  Constructor[];
}

export interface Constructor {
  constructorId?: string;
  url?:           string;
  name?:          string;
  nationality?:   string;
}

@Component({
  tag: 'constructor-detail',
  styleUrl: 'constructor-detail.css'
})
export class ConstructorDetail {

  @State() error = null;

  @State() isLoaded = false;

  @State() construct: ConstructorTable = {};

  @Prop() constructorId: string;

  componentDidLoad() {
    fetch(`https://ergast.com/api/f1/current/constructors/${this.constructorId}.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.isLoaded = true;
          this.construct = result.MRData.ConstructorTable;
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
        <h1>{this.construct.Constructors[0].name}</h1>
      </ion-content>
    ];
  }

}
