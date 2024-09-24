import {Routes} from '@angular/router';
import errorRoutes from "./features/error/error.routes";
import {ProjectResolver} from "./features/project/services/project.resolver";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./features/home/pages/home/home.component")
    },
    {
        path: "project/:id",
        loadComponent: () => import("./features/project/pages/project/project.component"),
        resolve: {
            project: ProjectResolver
        }
    },
    ...errorRoutes
];
