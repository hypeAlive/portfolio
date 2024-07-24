import { Injectable } from '@angular/core';
import {HeaderModule} from "./header.module";

@Injectable({
  providedIn: HeaderModule
})
export class HeaderService {

  constructor() { }
}
