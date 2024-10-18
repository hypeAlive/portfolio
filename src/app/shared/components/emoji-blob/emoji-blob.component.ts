import {Component, Input} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {hugeMail01} from "@ng-icons/huge-icons";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {EffectColor, getVarFromEffectColor} from "../../models/effects.interface";

export enum EmojiBackgroundType {
  BLOB1 = 'blob1',
  BLOB2 = 'blob2',
  BLOB3 = 'blob3',
  CIRCLE = 'circle'
}

export type EmojiBackground = {
  type: EmojiBackgroundType;
  color: EffectColor
}

@Component({
  selector: 'app-emoji-blob',
  standalone: true,
  imports: [
    NgIcon,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './emoji-blob.component.html',
  styleUrl: './emoji-blob.component.scss',
  viewProviders: [provideIcons({
    hugeMail01
  })]
})
export class EmojiBlobComponent {

  @Input('background')background: EmojiBackground = {
    type: EmojiBackgroundType.BLOB2,
    color: EffectColor.GRADIENT
  };

  protected isBackground(bg: EmojiBackgroundType): boolean {
    return this.background.type === bg
  }

  protected getBackgroundColor(): string {
    return getVarFromEffectColor(this.background.color);
  }

  protected isFillGradient(): boolean {
    return this.background.color === EffectColor.GRADIENT;
  }

  protected getFillStyle(): { [key: string]: string } {
    return this.isFillGradient() ? { 'fill': 'url(#gradient)' } : { 'fill': this.getBackgroundColor() };
  }

  protected EmojiBackgroundType = EmojiBackgroundType;
}
