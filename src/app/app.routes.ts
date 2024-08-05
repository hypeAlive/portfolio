import {Routes} from '@angular/router';
import {ErrorComponent} from "./error/error.component";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "404",
        component: ErrorComponent,
      },
      {
        path: "",
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
      }
    ]
  }
];
