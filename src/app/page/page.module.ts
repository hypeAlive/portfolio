import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {routes} from "./page.routes";
import {ProjectResolver} from "./project.resolver";
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {EnsureHttpInterceptor} from "../shared/ensure-http-interceptor.service";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    providers: [
      ProjectResolver,
      provideHttpClient()
    ]
})
export class PageModule { }
