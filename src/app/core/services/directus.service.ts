import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createDirectus, rest, RestClient} from "@directus/sdk";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {CoreModule} from "../core.module";

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


}
