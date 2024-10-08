import {Routes} from "@angular/router";
import {ErrorStatusCode} from "./models/error-state";
import {HeaderBackground} from "../../core/services/header.service";
import {FooterBackground} from "../../core/services/footer.service";

const routes: Routes = [
  ...Object.values(ErrorStatusCode).map(statusCode => ({
    path: statusCode.toString(),
    loadComponent: () => import('./pages/error/error.component'),
    title: statusCode.toString(),
    data: {
      statusCode,
      header: {
        showMenu: false,
        background: HeaderBackground.SHOW
      },
      footer: {
        small: true,
        background: FooterBackground.HALF_OPACITY,
        fixed: true
      },
    }
  })),
  {
    path: "**",
    redirectTo: ErrorStatusCode.NotFound.toString(), // Umleitung zu NotFound
    pathMatch: 'full'
  }
];

export default routes;
