import {NgxLoggerLevel} from "ngx-logger";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {EnsureHttpInterceptor} from "../app/interceptor/ensure-http-interceptor.service";
import {AuthInterceptor} from "../app/interceptor/auth.interceptor";
import {LoggerInterceptor} from "../app/interceptor/logger.interceptor";

export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api',
  logLevel: NgxLoggerLevel.INFO
};

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
];
