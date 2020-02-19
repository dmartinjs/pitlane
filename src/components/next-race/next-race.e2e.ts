import { newE2EPage } from '@stencil/core/testing';

describe('next-race', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<next-race></next-race>');

    const element = await page.find('next-race');
    expect(element).toHaveClass('hydrated');
  });
});
