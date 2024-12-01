import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor() { }

  public getNavigator(): Navigator {
    return navigator;
  }

  public isMobile(): boolean {
    return this.getNavigator().userAgent.includes('Mobi');
  }

  public isTablet(): boolean {
    return this.getNavigator().userAgent.includes('Tablet');
  }
}
