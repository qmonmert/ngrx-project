import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NgrxProjectAppComponent } from '../app/ngrx-project.component';

beforeEachProviders(() => [NgrxProjectAppComponent]);

describe('App: NgrxProject', () => {
  it('should create the app',
      inject([NgrxProjectAppComponent], (app: NgrxProjectAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ngrx-project works!\'',
      inject([NgrxProjectAppComponent], (app: NgrxProjectAppComponent) => {
    expect(app.title).toEqual('ngrx-project works!');
  }));
});
