import { html } from 'lit-html';

export default {
  title: 'Driver Standings',
  component: 'driver-standings'
};

export const Default = () => html`
  <driver-standings list-length="3"></driver-standings>
`;
