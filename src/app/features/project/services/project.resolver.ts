import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {NGXLogger} from "ngx-logger";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<Promise<any>> {

  constructor(private project: ProjectService, private router: Router, private logger: NGXLogger) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.logger.info('ProjectResolver initialized');
    const id = route.params['id'];

    return await this.project.testing(true);
  }
}
