import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import Manga from '../types/Manga';

type Result = {
  lists: string[];
  manga: Manga[];
};

function useManga(userName: string) {
  const [result, setResult] = useState<Result>({
    lists: [],
    manga: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await request<Response>(
          'https://graphql.anilist.co',
          query(userName)
        );

        const lists = response.MediaListCollection.lists;

        const listNames = lists.map((list) => list.name);

        const manga = lists
          .map((list) =>
            list.entries.map(
              (entry) =>
                ({
                  id: entry.media.id,
                  name:
                    entry.media.title.english ??
                    entry.media.title.romaji ??
                    entry.media.title.native,
                  color: entry.media.coverImage.color,
                  image: entry.media.coverImage.medium,
                  start: entry.startedAt.month,
                  end: entry.completedAt.month,
                } as Manga)
            )
          )
          .flat();

        return { lists: listNames, manga };
      } catch (e) {
        return { lists: [], manga: [] };
      }
    })().then(setResult);
  }, [userName]);

  return result;
}

type Response = {
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

type FuzzyDate = {
  year: number | null;
  month: number | null;
  day: number | null;
};

function query(userName: string) {
  return gql`
    {
      MediaListCollection(userName: "${userName}", type: MANGA) {
        lists {
          name
          entries {
            startedAt {
              ...FullDate
            }
            completedAt {
              ...FullDate
            }
            media {
              id
              title {
                english
                romaji
                native
              }
              coverImage {
                color
                medium
              }
            }
          }
        }
      }
    }

    fragment FullDate on FuzzyDate {
      year
      month
      day
    }
  `;
}

export default useManga;
