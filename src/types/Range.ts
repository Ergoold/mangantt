import { Manga } from '.';

export interface Range {
  start: number | null;
  end: number | null;
  manga: Manga[];
}
