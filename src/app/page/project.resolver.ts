import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {firstValueFrom, Observable, of} from 'rxjs';
import {NGXLogger} from "ngx-logger";
import {HttpClient} from "@angular/common/http";
import {PageModule} from "./page.module";
import {ProjectService} from "./shared/project.service";

@Injectable({
  providedIn: PageModule
})
export class ProjectResolver implements Resolve<Promise<any>> {

  constructor(private project: ProjectService, private router: Router, private logger: NGXLogger) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.logger.info('ProjectResolver initialized');
    const id = route.paramMap.get('id');

    return await this.project.testing(true);
  }
}
