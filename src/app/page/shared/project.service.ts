import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  public async testing(bool: boolean): Promise<any> {
    if (bool)
      return await firstValueFrom(this.http.get('https://jsonplaceholder.typicode.com/todos/1'));
    else
      return await firstValueFrom(this.http.get('https://localhost:8080'));
  }

}
