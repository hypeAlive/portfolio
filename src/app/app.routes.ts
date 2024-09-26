import {Routes} from '@angular/router';
import errorRoutes from "./features/error/error.routes";
import {ProjectResolver} from "./features/project/services/project.resolver";
import {HeaderBackground} from "./core/services/header.service";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/pages/home/home.component"),
    data: {
      header: {
        showMenu: true,
        background: HeaderBackground.BLEND_IN_ON_SCROLL
      }
    }
  },
  {
    path: "project/:id",
    loadComponent: () => import("./features/project/pages/project/project.component"),
    data: {
      header: {
        showMenu: false,
        background: HeaderBackground.SHOW
      }
    },
    resolve: {
      project: ProjectResolver
    }
  },
  ...errorRoutes
];
