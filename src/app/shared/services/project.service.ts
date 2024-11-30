import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ProjectCmsResponse, ProjectSection, ProjectShortCmsResponse} from "../models/project.interface";
import {getDirectusFileUrl} from "../models/directus.interface";
import {DirectusService} from "../../core/services/directus.service";
import {environment} from "../../../environments/environment";
import {NGXLogger} from "ngx-logger";
import {ProjectCard} from "../../features/home/components/card/card.component";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Map<string, ProjectCmsResponse> = new Map<string, ProjectCmsResponse>();

  constructor(private http: HttpClient, private directus: DirectusService, private logger: NGXLogger) {}

  private static readonly API_URL = environment.apiUrl;

  public async getProjectCards(): Promise<ProjectCard[]> {
    const projects = await this.getProjects();
    const cards = projects.map((project) => ({
      id: project.id,
      title: project.translations[0].title,
      languages: project.languages,
      description: project.translations[0].description_short,
      imgUrl: project.project_pictures.length >= 1 ? getDirectusFileUrl(project.project_pictures[0].directus_files_id) : '',
      url: project.url
    }));

    const sortedCards: typeof cards = [];
    const middleIndex = Math.floor(cards.length / 2);

    cards.forEach((card, index) => {
      const position = index % 2 === 0 ? middleIndex + Math.floor(index / 2) : middleIndex - Math.ceil(index / 2);
      sortedCards[position] = card;
    });

    return sortedCards;
  }

  public async getSectionById(id: number): Promise<ProjectSection> {
    return await this.directus.readItemWithTranslation("projects_section", id);
  }

  public async getProjectByUrl(url: string): Promise<ProjectCmsResponse> {
    if (!this.projects.has(url)) {
      await this.getProjects();
    }

    const project = this.projects.get(url);
    if (!project) return Promise.reject();


    return project;
  }
  public async getProjects(): Promise<ProjectCmsResponse[]> {
    return await this.directus.readItemsWithTranslation<ProjectCmsResponse>("projects", {
      fields: ['*', {translations: ['*'], project_pictures: ['*']}]
    }).then((response) => {

      response.forEach((project) => {
        this.projects.set(project.url, project);
      });

      return response;

    });
  }

}
