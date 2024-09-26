import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ProjectCard} from "../../home/components/card/card.component";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  private static readonly API_URL = environment.apiUrl;

  public async testing(bool: boolean): Promise<any> {
    if (bool)
      return await firstValueFrom(this.http.get('https://jsonplaceholder.typicode.com/todos/1'));
    else
      return await firstValueFrom(this.http.get('https://localhost:8080'));
  }

  public async getProjectCards(): Promise<ProjectCard[]> {
    return await firstValueFrom(this.http.get<ProjectCard[]>(ProjectService.API_URL + '/project/cards'));
  }

}
