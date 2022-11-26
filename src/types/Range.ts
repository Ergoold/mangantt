import { Manga } from '.';

export interface Range {
  start?: number;
  end?: number;
  manga: Manga[];
}
