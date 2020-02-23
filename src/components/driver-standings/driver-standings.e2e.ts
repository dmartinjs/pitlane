import { newE2EPage } from '@stencil/core/testing';

describe('driver-standings', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<driver-standings></driver-standings>');

    const element = await page.find('driver-standings');
    expect(element).toHaveClass('hydrated');
  });
});
