import { Angular4AvanzadoPage } from './app.po';

describe('angular4-avanzado App', () => {
  let page: Angular4AvanzadoPage;

  beforeEach(() => {
    page = new Angular4AvanzadoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
