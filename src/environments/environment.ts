import {NgxLoggerLevel} from "ngx-logger";
import {GET_PROJECT_CARDS} from "./mock-data";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {EnsureHttpInterceptor} from "../app/interceptor/ensure-http-interceptor.service";
import {AuthInterceptor} from "../app/interceptor/auth.interceptor";
import {LoggerInterceptor} from "../app/interceptor/logger.interceptor";
import {MockInterceptor} from "../app/interceptor/mock.interceptor";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  logLevel: NgxLoggerLevel.DEBUG,
  mockRoutes: {
    '/project/cards': {
      'GET': GET_PROJECT_CARDS
    }
  }
};

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }
];
