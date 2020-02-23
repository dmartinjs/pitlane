import { newE2EPage } from '@stencil/core/testing';

describe('race-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<race-list></race-list>');

    const element = await page.find('race-list');
    expect(element).toHaveClass('hydrated');
  });
});
