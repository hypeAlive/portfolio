import { Component } from '@angular/core';
import {EffectColor, getVarFromEffectColor} from "../../models/effects.interface";
import {NgIf, NgStyle} from "@angular/common";
import {NavigatorService} from "../../../core/services/navigator.service";

@Component({
    selector: 'app-hero-blobs',
    imports: [
        NgIf,
        NgStyle
    ],
    templateUrl: './hero-blobs.component.html',
    styleUrl: './hero-blobs.component.scss'
})
export class HeroBlobsComponent {

  constructor(protected device: NavigatorService) {
  }

  isMobile(): boolean {
    return this.device.isMobile();
  }


  protected readonly getVarFromEffectColor = getVarFromEffectColor;
    protected readonly EffectColor = EffectColor;
}
