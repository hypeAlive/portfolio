import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {EnsureHttpInterceptor} from "./ensure-http-interceptor.service";
import {AuthInterceptor} from "./auth.interceptor";
import {LoggerInterceptor} from "./logger.interceptor";
import {MockInterceptor} from "./mock.interceptor";
import {environment} from "../../environments/environment";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ...(environment.useMockApiCalls ? [{ provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }] : [])
];
