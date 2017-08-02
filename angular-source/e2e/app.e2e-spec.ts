import { AngularSourcePage } from './app.po';

describe('angular-source App', () => {
  let page: AngularSourcePage;

  beforeEach(() => {
    page = new AngularSourcePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
