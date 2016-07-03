export class NgrxProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngrx-project-app h1')).getText();
  }
}
