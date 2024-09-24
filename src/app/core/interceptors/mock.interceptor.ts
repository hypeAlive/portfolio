import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  //@ts-ignore
  private mockRoutes: { [key: string]: { [method: string]: any } } = environment.mockRoutes;

  constructor(private logger: NGXLogger) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.mockRoutes) {
      this.logger.error('MockInterceptor isn\'t configured correctly', 'Tried to use MockInterceptor, but could not find mockRoutes in environment.ts');
      return next.handle(req);
    }

    return new Observable(observer => {
      const matchedRoute = this.getMatchedRoute(req.url, req.method);
      if (matchedRoute === null) {
        this.logger.warn('Project using MockInterceptor, but there is no mock route for this request. Trying to make a real request', req.url);
        next.handle(req).subscribe({
          error: err => observer.error(err),
          next: event => observer.next(event),
          complete: () => observer.complete(),
        });
      } else {
        setTimeout(() => {
          observer.next(new HttpResponse({ status: 200, body: matchedRoute }));
          observer.complete();
        }, 10);
      }
    });
  }

  private getMatchedRoute(url: string, method: string): any | null {
    const apiUrl = environment.apiUrl;
    const route = this.mockRoutes[url.replace(apiUrl, '')];
    return route ? route[method] : null;
  }
}
