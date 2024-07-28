import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {LogLevel} from "./log-level.enum";
import {style} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private static level: LogLevel = LogLevel.DEBUG;

  public debug(...message: any): void {
    LoggerService.writeToLog(LogLevel.DEBUG, ...message);
  }

  public info(...message: any) {
    LoggerService.writeToLog(LogLevel.INFO, ...message);
  }

  public warn(...message: any) {
    LoggerService.writeToLog(LogLevel.WARN, ...message);
  }

  public error(...message: any) {
    LoggerService.writeToLog(LogLevel.ERROR, ...message);
  }

  /**
   * Should write the log?
   */
  private static shouldLog(level: LogLevel): boolean {
    return (level >= environment.logLevel);
  }

  /**
   * Write logs.
   */
  private static writeToLog(level: LogLevel, ...message: any) {
    if (!this.shouldLog(level)) return;

    const className = LoggerService.getClassName();
    const logMessage = `[${className}] ${message.join(' ')}`;

    const style = LoggerService.getLogStyle(level);

    switch (level) {
      case LogLevel.DEBUG:
        console.debug("⚠️" + `%c${logMessage}`, style);
        break;
      case LogLevel.INFO:
        console.info("📢"+ `%c${logMessage}`, style);
        break;
      case LogLevel.WARN:
        console.warn(`%c${logMessage}`, style);
        break;
      case LogLevel.ERROR:
        console.error(`%c${logMessage}`, style);
        break;
      default:
        console.log(`%c${logMessage}`, style);
    }
  }

  private static getClassName(): string {
    const error = new Error();
    const stack = error.stack?.split('\n');
    if (stack && stack.length > 3) {
      const callerLine = stack[4];
      const classNameMatch = callerLine.match(/at _(\w+)/);
      if (classNameMatch) {
        return classNameMatch[1];
      }
    }
    return 'Unknown';
  }

  /**
   * To add the date on logs.
   */
  private static getLogDate(): string {
    const date = new Date();
    return '' +
      date.getUTCFullYear() + '/' +
      (date.getUTCMonth() + 1) + '/' +
      date.getUTCDate() + ' ' +
      date.getUTCHours() + ':' +
      date.getUTCMinutes() + ':' +
      date.getUTCSeconds() + '.' +
      date.getMilliseconds() + '';
  }

  private static getLogStyle(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return 'color: #17A598;';
      case LogLevel.INFO:
        return 'color: #32CD32;';
      case LogLevel.WARN:
        return '';
      case LogLevel.ERROR:
        return '';
      default:
        return '';
    }
  }
}

