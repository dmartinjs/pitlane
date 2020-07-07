import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'race-results',
  shadow: true,
})
export class RaceResults {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
