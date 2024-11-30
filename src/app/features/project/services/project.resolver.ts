import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {NGXLogger} from "ngx-logger";
import {ErrorStatusCode} from "../../error/models/error-state";
import {ProjectService} from "../../../shared/services/project.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<Promise<any>> {

  constructor(private project: ProjectService, private router: Router, private logger: NGXLogger) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.logger.info('ProjectResolver initialized');
    const id = route.params['id'];

    if (!id) {
      return this.router.navigate([ErrorStatusCode.NotFound]);
    }

    return await this.project.getProjectByUrl(id)
      .catch(() => {
        return this.router.navigate([ErrorStatusCode.NotFound]);
      });
  }
}
