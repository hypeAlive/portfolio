import {NgxLoggerLevel} from "ngx-logger";
import {GET_PROJECT_CARDS} from "./mock-data";
import {MockInterceptor} from "../app/core/interceptors/mock.interceptor";

export const environment = {
  production: false,
  apiUrl: '',
  cmsUrl: 'https://cms.nicolasfritz.dev',
  logLevel: NgxLoggerLevel.DEBUG,
  mockInterceptor: MockInterceptor,
  mockRoutes: {
    '/project/cards': {
      'GET': GET_PROJECT_CARDS
    }
  }
};
