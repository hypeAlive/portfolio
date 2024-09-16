import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import { environment } from '../environments/environment';
import {APIInterceptor} from "./shared/api.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    importProvidersFrom(
      BrowserModule,
      LoggerModule.forRoot({
        level: environment.logLevel
      }),
      BrowserAnimationsModule
    ),
    provideAnimationsAsync()
  ]
};
