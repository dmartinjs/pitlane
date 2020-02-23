import { newE2EPage } from '@stencil/core/testing';

describe('constructor-standings', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<constructor-standings></constructor-standings>');

    const element = await page.find('constructor-standings');
    expect(element).toHaveClass('hydrated');
  });
});
