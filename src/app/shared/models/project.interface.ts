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

export interface ProjectSection {
  action_btn: boolean;
  action_link: string;
  has_img: "hidden" | "left" | "right";
  img: string;
  id: number;
  project_id: number;
  show_title: boolean;
  translations: ProjectSectionTranslation[];
}

export interface ProjectSectionTranslation extends DirectusTranslation {
  btn_text: string;
  text: string;
  title: string;
}

export interface ProjectTranslation extends ProjectShortTranslation {
  description_long: string;
}

export interface ProjectCmsResponse extends ProjectShortCmsResponse {
  translations: ProjectTranslation[];
  code_link: string | null;
  project_link: string | null;
  section: number[]; // only the ids
}
