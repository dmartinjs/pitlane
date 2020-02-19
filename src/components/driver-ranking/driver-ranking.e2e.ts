import { newE2EPage } from '@stencil/core/testing';

describe('driver-ranking', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<driver-ranking></driver-ranking>');

    const element = await page.find('driver-ranking');
    expect(element).toHaveClass('hydrated');
  });
});
