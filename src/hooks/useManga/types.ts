import { FuzzyDate } from '../../types';

export type Response = {
  MediaListCollection: {
    lists: {
      name: string;
      entries: {
        startedAt: FuzzyDate;
        completedAt: FuzzyDate;
        media: {
          id: string;
          title: {
            english: string;
            romaji: string;
            native: string;
          };
          coverImage: {
            color: string | null;
            medium: string | null;
          };
        };
      }[];
    }[];
  };
};
