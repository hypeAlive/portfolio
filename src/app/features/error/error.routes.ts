import {Routes} from "@angular/router";
import {ErrorStatusCode} from "./models/error-state";
import {HeaderBackground} from "../../core/services/header.service"; // Achte darauf, dass der Pfad korrekt ist

const routes: Routes = [
  ...Object.values(ErrorStatusCode).map(statusCode => ({
    path: statusCode.toString(),
    loadComponent: () => import('./pages/error/error.component'),
    title: statusCode.toString(),
    data: {statusCode, header: {showMenu: false, background: HeaderBackground.SHOW}}
  })),
  {
    path: "**",
    redirectTo: ErrorStatusCode.NotFound.toString(), // Umleitung zu NotFound
    pathMatch: 'full'
  }
];

export default routes;
