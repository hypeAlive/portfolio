import {DirectusFile, DirectusTranslation} from "./directus.interface";

export interface ProjectShortCmsResponse {
  sort: number;
  url: string;
  id: number;
  is_first: boolean;
  languages: string[];
  translations: ProjectShortTranslation[];
  project_pictures: DirectusFile[];
}

export interface ProjectShortTranslation extends DirectusTranslation {
  description_short: string;
  title: string;
}

export interface ProjectTranslation extends ProjectShortTranslation {
  description_long: string;
}

export interface ProjectCmsResponse extends ProjectShortCmsResponse {
  translations: ProjectTranslation[];
  code_link: string;
  project_link: string;
}
