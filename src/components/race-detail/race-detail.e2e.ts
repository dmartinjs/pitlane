import { newE2EPage } from '@stencil/core/testing';

describe('race-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<race-detail></race-detail>');

    const element = await page.find('race-detail');
    expect(element).toHaveClass('hydrated');
  });
});
