import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoggerModule} from "ngx-logger";
import {environment} from "../environments/environment";
import {provideCoreServices} from "./core/core.module";
import {provideLottieOptions} from "ngx-lottie";

function localeFactory(): string {
  if(!environment.production) return 'de';
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split('/');
  return pathSegments[1] || 'de';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      get scrollPositionRestoration() {
        console.log("scrollPositionRestoration");
        const params = new URLSearchParams(window.location.search);
        if (params.get('id')) {
          console.log("has id");
          return 'top' as const;
        }
        return 'disabled' as const;
      },
      anchorScrolling: 'enabled',
    })),
    provideLottieOptions({
      player: () => import('lottie-web')
    }),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      LoggerModule.forRoot({
        level: environment.logLevel
      }),
      BrowserAnimationsModule,
    ),
    provideCoreServices(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: localeFactory() },
  ]
};
