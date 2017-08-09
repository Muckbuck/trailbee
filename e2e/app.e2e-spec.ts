import { TrailbeePage } from './app.po';

describe('trailbee App', () => {
  let page: TrailbeePage;

  beforeEach(() => {
    page = new TrailbeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
