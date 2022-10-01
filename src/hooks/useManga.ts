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
                  start: entry.startedAt.month,
                  end: entry.completedAt.month,
                } as Manga)
            )
          )
          .flat();

        const earliest =
          Math.min(...manga.map((manga) => manga.start ?? Number.MAX_VALUE)) -
          1;
        const latest =
          Math.max(...manga.map((manga) => manga.end ?? Number.MIN_VALUE)) + 1;
        manga.sort((a, b) => {
          if (!a.end && !a.start) return -1;
          if (!b.end && !b.start) return 1;
          if ((a.end ?? latest) < (b.start ?? earliest)) return -1;
          if ((a.start ?? earliest) > (b.end ?? latest)) return 1;
          if ((a.end ?? latest) > (b.end ?? latest)) return -1;
          if ((a.end ?? latest) < (b.end ?? latest)) return 1;
          if ((a.start ?? earliest) < (b.start ?? earliest)) return -1;
          if ((a.start ?? earliest) > (b.start ?? earliest)) return 1;
          return 0;
        });

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
