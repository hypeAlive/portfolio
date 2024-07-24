import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {NgIcon} from "@ng-icons/core";
import {SwapComponent} from "../shared/swap/swap.component";



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
    SwapComponent
  ]
})
export class HeaderModule {

}
