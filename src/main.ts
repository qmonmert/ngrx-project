import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgrxProjectAppComponent, environment } from './app/';
import { provideStore } from "@ngrx/store";
import * as APP_REDUCERS from "./app/reducers/reducers";
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { runEffects } from '@ngrx/effects';
import { Effects } from './app/effects/effects';

if (environment.production) {
  enableProdMode();
}

bootstrap(NgrxProjectAppComponent, [
  provideStore(APP_REDUCERS),
  // instrumentStore() sets up the @ngrx/store-devtools providers
  instrumentStore({
    monitor: useLogMonitor({
      position: 'right',
      visible: true
    })
  }),
  runEffects(Effects)
]);
