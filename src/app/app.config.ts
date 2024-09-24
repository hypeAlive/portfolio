import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoggerModule} from "ngx-logger";
import {environment} from "../environments/environment";
import {CoreModule, provideCoreServices} from "./core/core.module";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      LoggerModule.forRoot({
        level: environment.logLevel
      }),
      BrowserAnimationsModule
    ),
    provideCoreServices(),
    provideAnimationsAsync()
  ]
};
