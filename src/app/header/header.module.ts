import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {NgIcon} from "@ng-icons/core";
import {SwapComponent} from "../shared/swap/swap.component";
import {ParallaxDirective} from "../shared/parallax.directive";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        NgIcon,
        SwapComponent,
        ParallaxDirective
    ]
})
export class HeaderModule {

}
