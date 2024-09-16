import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProjectResolver} from "./project.resolver";
import {ProjectComponent} from "./project/project.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'project',
    component: ProjectComponent,
    resolve: {
      resolvedData: ProjectResolver
    }
  }
];
