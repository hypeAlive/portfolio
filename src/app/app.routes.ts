import {Routes} from '@angular/router';
import errorRoutes from "./features/error/error.routes";
import {ProjectResolver} from "./features/project/services/project.resolver";
import {HeaderBackground} from "./core/services/header.service";
import {MaintenanceGuard} from "./shared/services/maintenance.guard";
import {FooterBackground} from "./core/services/footer.service";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/pages/home/home.component"),
    title: "Home",
    canActivate: [MaintenanceGuard],
    data: {
      header: {
        showMenu: true,
        background: HeaderBackground.BLEND_IN_ON_SCROLL
      },
      footer: {
        background: FooterBackground.SHOW,
      }
    }
  },
  {
    path: "project/:id",
    loadComponent: () => import("./features/project/pages/project/project.component"),
    title: "Project",
    canActivate: [MaintenanceGuard],
    data: {
      header: {
        showMenu: false,
        background: HeaderBackground.BLEND_IN_ON_SCROLL
      }
    },
    resolve: {
      project: ProjectResolver
    }
  },
  ...errorRoutes
];
