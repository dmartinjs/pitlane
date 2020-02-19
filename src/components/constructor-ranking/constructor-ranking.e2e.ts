import { newE2EPage } from '@stencil/core/testing';

describe('constructor-ranking', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<constructor-ranking></constructor-ranking>');

    const element = await page.find('constructor-ranking');
    expect(element).toHaveClass('hydrated');
  });
});
