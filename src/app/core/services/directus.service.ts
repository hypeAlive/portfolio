import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createDirectus, readItems, rest, RestClient} from "@directus/sdk";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {CoreModule} from "../core.module";
import { MaintenanceData } from '../../shared/services/maintenance.guard';

@Injectable({
  providedIn: CoreModule
})
export class DirectusService {

  private readonly client;
  private readonly locale: string;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
    this.client = createDirectus(environment.cmsUrl, {
      globals: {
        fetch: (url, options) => lastValueFrom(this.http.request(options.method, url, options))
      }
    })
      .with(rest());
  }

  public getRestClient(): RestClient<any> {
    return this.client;
  }

  public withTranslations() {
    return {
      deep: {
        translations: {
          _filter: {
            languages_code: {_eq: this.getLocale()},
          },
        },
      }
    };
  }

  public withFallbackTranslations() {
    return {
      deep: {
        translations: {
          _filter: {
            languages_code: {_eq: this.getDefaultLocale()},
          },
        },
      }
    };
  }

  public isDefaultLocale(): boolean {
    return this.getLocale() === this.getDefaultLocale();
  }

  public getLocale(): string {
    return this.locale;
  }

  public getDefaultLocale(): string {
    return 'de';
  }

  public getMaintenanceData() {
    const currentTimestamp = new Date().toISOString();
    return this.getRestClient()
      .request<MaintenanceData[]>(readItems('maintenance', {
        filter: {
          _or: [
            {
              _and: [
                {scheduled_for: {_lte: currentTimestamp}},
                {scheduled_until: {_gte: currentTimestamp}}
              ]
            },
            {scheduled: {_eq: false}}
          ]
        },
        sort: ['-scheduled', '-scheduled_until'],
        limit: 1
      }));
  }


}
