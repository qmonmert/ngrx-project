import { NgrxProjectPage } from './app.po';

describe('ngrx-project App', function() {
  let page: NgrxProjectPage;

  beforeEach(() => {
    page = new NgrxProjectPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngrx-project works!');
  });
});
