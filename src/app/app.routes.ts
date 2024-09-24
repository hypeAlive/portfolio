import {Routes} from '@angular/router';
import {ErrorComponent} from "./features/error/pages/error/error.component";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./features/home/pages/home/home.component")
            .then(m => m.HomeComponent)
    },
    {
        path: "project/:id",
        loadComponent: () => import("./features/project/pages/project/project.component")
            .then(m => m.ProjectComponent)
    },
    {
        path: "**",
        loadComponent: () => import("./features/error/pages/error/error.component")
            .then(m => m.ErrorComponent),
        data: {code: 404}
    }
];
