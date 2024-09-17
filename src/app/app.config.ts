import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoggerModule} from "ngx-logger";
import {environment } from "../environments/environment";
import {EnsureHttpInterceptor} from "./interceptor/ensure-http-interceptor.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {LoggerInterceptor} from "./interceptor/logger.interceptor";

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  //@ts-ignore
  ...(environment.mockInterceptor ? [{ provide: HTTP_INTERCEPTORS, useClass: environment.mockInterceptor, multi: true }] : [])
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
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
