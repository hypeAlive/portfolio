import {NgxLoggerLevel} from "ngx-logger";
import {GET_PROJECT_CARDS} from "./mock-data";

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  logLevel: NgxLoggerLevel.DEBUG,
  useMockApiCalls: true,
  mockRoutes: {
    '/project/cards': {
      'GET': GET_PROJECT_CARDS
    }
  }
};
