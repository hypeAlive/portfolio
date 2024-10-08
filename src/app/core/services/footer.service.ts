import {Injectable} from '@angular/core';
import {CoreModule} from "../core.module";
import {RouteConfig} from "../models/RouteConfig";

export type FooterConfig = {
  small: boolean;
  background: FooterBackground;
}

export enum FooterBackground {
  SHOW = 'show',
  HALF_OPACITY = 'half-opacity',
}

@Injectable({
  providedIn: CoreModule
})
export class FooterService extends RouteConfig<FooterConfig> {

  public static readonly DEFAULT_CONFIG: FooterConfig = {
    small: false,
    background: FooterBackground.SHOW
  }

  constructor() {
    super('footer', FooterService.DEFAULT_CONFIG);
  }

}
