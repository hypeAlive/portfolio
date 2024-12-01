import {Component, OnInit} from '@angular/core';
import {ProjectCard} from "../../../home/components/card/card.component";
import {NGXLogger} from "ngx-logger";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RainbowTextComponent} from "../../../../shared/components/rainbow-text/rainbow-text.component";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {ProjectCmsResponse, ProjectSection} from "../../../../shared/models/project.interface";
import {
  diAngularOriginal,
  diExpressOriginal,
  diJavaOriginal,
  diJavascriptOriginal,
  diPythonOriginal, diTypescriptOriginal
} from "@ng-icons/devicon/original";
import {getDirectusFileUrl} from "../../../../shared/models/directus.interface";
import {ProjectService} from "../../../../shared/services/project.service";
import {ProjectSectionComponent} from "../../components/project-section/project-section.component";
import {EffectColor, getVarFromEffectColor} from "../../../../shared/models/effects.interface";
import {HeroBlobsComponent} from "../../../../shared/components/hero-blobs/hero-blobs.component";
import {
  PointGradientComponent,
  PointImageGradient
} from "../../../../shared/components/point-gradient/point-gradient.component";
import {NavigatorService} from "../../../../core/services/navigator.service";

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    imports: [
        NgIf,
        RainbowTextComponent,
        NgForOf,
        NgIcon,
        NgClass,
        ProjectSectionComponent,
        HeroBlobsComponent,
        PointGradientComponent
    ],
    styleUrl: './project.component.scss',
    viewProviders: [provideIcons({
            diAngularOriginal,
            diExpressOriginal,
            diJavaOriginal,
            diJavascriptOriginal,
            diPythonOriginal,
            diTypescriptOriginal
        })]
})
export default class ProjectComponent implements OnInit {

  private project: ProjectCmsResponse | undefined = undefined;
  protected activePictureIndex: number = 0;
  protected imgs: string[] = [];
  private sections: Map<number, ProjectSection> = new Map<number, ProjectSection>();
  private autoSlideInterval: any;

  constructor(private logger: NGXLogger, private activatedRoute: ActivatedRoute, private projectService: ProjectService, protected device: NavigatorService) {
  }

  isMobile(): boolean {
    return this.device.isMobile();
  }

  get projectLink(): string | null {
    return this.project?.project_link || null;
  }

  getSections(): ProjectSection[] {
    return Array.from(this.sections.values());
  }

  get codeLink(): string | null {
    return this.project?.code_link || null;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      if(data['project']) {
        this.project = data['project'];
        this.imgs = this.getImgs();
        this.logger.log(this.project);
        this.startAutoSlide();

        if(!this.project) return;
        this.project.section.forEach((sectionId) => {
          this.projectService.getSectionById(sectionId).then((section) => {
            this.sections.set(sectionId, section);
          });
        });

      }
    });
    this.logger.log(this.activatedRoute.snapshot.data);
    this.logger.info('ProjectComponent initialized');

  }

  getItems(): ProjectCard[] {
    return [];
  }

  protected getLanguages(): string[] {
    if(!this.project) return [];
    return this.project.languages;
  }

  protected getTitle(): string {
    if(!this.project) return '';
    return this.project.translations[0].title;
  }

  protected getLongDescription(): string {
    if(!this.project) return '';
    return this.project.translations[0].description_long;
  }

  private getImgs(): string[] {
    if(!this.project) return [];
    return this.project.project_pictures.map((projectPicture) => getDirectusFileUrl(projectPicture.directus_files_id));
  }

  protected getImgUrl(): string {
    if(!this.project) return '';
    const projectPicture = this.project.project_pictures[0];
    if(!projectPicture) return '';
    return getDirectusFileUrl(projectPicture.directus_files_id);
  }

  protected activatePicture(index: number) {
    this.activePictureIndex = index
  }

  protected prevSlide(): void {
    this.activePictureIndex = (this.activePictureIndex > 0) ? this.activePictureIndex - 1 : this.imgs.length - 1;
  }

  protected nextSlide(): void {
    this.activePictureIndex = (this.activePictureIndex < this.imgs.length - 1) ? this.activePictureIndex + 1 : 0;
  }

  protected startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  protected stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }


  protected readonly getVarFromEffectColor = getVarFromEffectColor;
  protected readonly EffectColor = EffectColor;
  protected readonly PointImageGradient = PointImageGradient;
}
