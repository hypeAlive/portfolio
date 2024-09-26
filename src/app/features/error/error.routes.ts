import {Routes} from "@angular/router";
import {ErrorStatusCode} from "./models/error-state"; // Achte darauf, dass der Pfad korrekt ist

const routes: Routes = [
  ...Object.values(ErrorStatusCode).map(statusCode => ({
    path: statusCode.toString(),
    loadComponent: () => import('./pages/error/error.component'),
    data: {statusCode}
  })),
  {
    path: "**",
    redirectTo: ErrorStatusCode.NotFound.toString(), // Umleitung zu NotFound
    pathMatch: 'full'
  }
];

export default routes;
