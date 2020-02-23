import { newE2EPage } from '@stencil/core/testing';

describe('driver-rank', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<driver-rank></driver-rank>');

    const element = await page.find('driver-rank');
    expect(element).toHaveClass('hydrated');
  });
});
