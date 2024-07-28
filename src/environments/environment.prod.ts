import {LogLevel} from "../app/shared/logger/log-level.enum";

export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api',
  logLevel: LogLevel.ERROR
};
