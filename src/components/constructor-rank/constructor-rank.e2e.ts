import { newE2EPage } from '@stencil/core/testing';

describe('constructor-rank', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<constructor-rank></constructor-rank>');

    const element = await page.find('constructor-rank');
    expect(element).toHaveClass('hydrated');
  });
});
