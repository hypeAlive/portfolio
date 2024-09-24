import {Routes} from '@angular/router';
import errorRoutes from "./features/error/error.routes";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./features/home/pages/home/home.component")
    },
    {
        path: "project/:id",
        loadComponent: () => import("./features/project/pages/project/project.component")
    },
    ...errorRoutes
];
