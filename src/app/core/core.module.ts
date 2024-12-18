import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {HeaderService} from "./services/header.service";
import {ThemeService} from "./services/theme.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {EnsureHttpInterceptor} from "./interceptors/ensure-http-interceptor.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {LoggerInterceptor} from "./interceptors/logger.interceptor";
import {environment} from "../../environments/environment";
import {ParallaxDirective} from "../shared/directives/parallax.directive";
import {SwapComponent} from "../shared/components/swap/swap.component";
import {NgIcon} from "@ng-icons/core";
import {provideToastr} from "ngx-toastr";
import {ToastComponent} from "./components/toast/toast.component";
import {NotifyService} from "./services/notify.service";
import {TitleStrategy} from "@angular/router";
import {CoreTitleStrategy} from "./services/core-tilte.strategy";
import {DirectusService} from "./services/directus.service";
import {FooterService} from "./services/footer.service";

const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: EnsureHttpInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true},
  //@ts-ignore
  ...(environment.mockInterceptor ? [{
    provide: HTTP_INTERCEPTORS,
    // @ts-ignore
    useClass: environment.mockInterceptor,
    multi: true
  }] : [])
];

export const provideCoreServices = () => [
  ...httpInterceptorProviders,
  HeaderService,
  FooterService,
  DirectusService,
  ThemeService,
  { provide: TitleStrategy, useClass: CoreTitleStrategy },
  provideToastr({
    toastComponent: ToastComponent,
    positionClass: 'toast-bottom-right',
    toastClass: '',
  }),
  NotifyService
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ParallaxDirective,
    SwapComponent,
    NgIcon
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import it in the AppModule only.');
    }
  }
}
