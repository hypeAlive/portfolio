import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {authentication, createDirectus, rest, RestClient} from "@directus/sdk";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DirectusService {

  private readonly client;

  constructor(private http: HttpClient) {
    this.client = createDirectus("https://cms.nicolasfritz.dev", {
      globals: {
        fetch: (url, options) => lastValueFrom(this.http.request(options.method, url, options))
      }
    })
      .with(rest());
  }

  public getRestClient(): RestClient<any> {
    return this.client;
  }


}
