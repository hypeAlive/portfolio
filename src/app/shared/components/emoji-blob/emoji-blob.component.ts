import {Component, input} from '@angular/core';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {hugeMail01, hugeMailbox01} from "@ng-icons/huge-icons";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {EffectColor, getVarFromEffectColor} from "../../models/effects.interface";
import {PointGradientComponent} from "../point-gradient/point-gradient.component";
import {diAngularOriginal, diJavaOriginal, diTypescriptOriginal} from "@ng-icons/devicon/original";

export enum EmojiBackgroundType {
  BLOB1 = 'blob1',
  BLOB2 = 'blob2',
  BLOB3 = 'blob3',
  CIRCLE = 'circle'
}

export type EmojiBackground = {
  type: EmojiBackgroundType;
  color: EffectColor
  glow: EffectColor | undefined;
}

@Component({
  selector: 'app-emoji-blob',
  imports: [
    NgIcon,
    NgIf,
    NgClass,
    NgStyle,
    PointGradientComponent
  ],
  templateUrl: './emoji-blob.component.html',
  styles: `.svg-container {
    width: 3em;
    height: auto;
  }`,
  viewProviders: [provideIcons({
    hugeMail01,
    hugeMailbox01,
    diAngularOriginal,
    diTypescriptOriginal,
    diJavaOriginal
  })]
})
export class EmojiBlobComponent {

  readonly background = input<EmojiBackground>({
    type: EmojiBackgroundType.BLOB2,
    color: EffectColor.GRADIENT,
    glow: EffectColor.ACCENT
});
  readonly iconMirror = input<boolean>(false, { alias: "mirrorIcon" });
  readonly dropShadow = input<boolean>(false);
  readonly size = input<string>('1', { alias: "iconSize" });
  readonly bgSize = input<string>('3');

  readonly name = input<string>('hugeMailbox01');

  protected isBackground(bg: EmojiBackgroundType): boolean {
    return this.background().type === bg
  }

  protected getBackgroundColor(): string {
    return getVarFromEffectColor(this.background().color);
  }

  protected isFillGradient(): boolean {
    return this.background().color === EffectColor.GRADIENT;
  }

  protected getFillStyle(): { [key: string]: string } {
    return this.isFillGradient() ? { 'fill': 'url(#gradient)' } : { 'fill': this.getBackgroundColor() };
  }

  protected EmojiBackgroundType = EmojiBackgroundType;
  protected readonly PointColorGradient = EffectColor;
  protected readonly encodeURI = encodeURI;
}
