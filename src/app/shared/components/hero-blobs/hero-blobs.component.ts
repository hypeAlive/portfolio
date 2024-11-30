import { Component } from '@angular/core';
import {EffectColor, getVarFromEffectColor} from "../../models/effects.interface";
import {NgIf, NgStyle} from "@angular/common";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-hero-blobs',
  standalone: true,
  imports: [
    NgIf,
    NgStyle
  ],
  templateUrl: './hero-blobs.component.html',
  styleUrl: './hero-blobs.component.scss'
})
export class HeroBlobsComponent {

  constructor(protected device: DeviceDetectorService,) {
  }

  isMobile(): boolean {
    return this.device.isMobile();
  }


  protected readonly getVarFromEffectColor = getVarFromEffectColor;
    protected readonly EffectColor = EffectColor;
}
