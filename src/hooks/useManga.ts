import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import { Manga, Result } from '../types';

const whitelist = ['Completed', 'Reading'];

function useManga(userName: string) {
  const [result, setResult] = useState<Result<Manga[]>>({
    status: 'failure',
  });

  useEffect(() => {
    (async (): Promise<Result<Manga[]>> => {
      try {
        const response = await request<Response>(
          'https://graphql.anilist.co',
          query(userName)
        );

        const lists = response.MediaListCollection.lists;

        const manga = lists
          .filter(({ name }) => whitelist.includes(name))
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

        return { status: 'success', result: manga };
      } catch (e) {
        return { status: 'failure' };
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
              ...Date
            }
            completedAt {
              ...Date
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

    fragment Date on FuzzyDate {
      year
      month
      day
    }
  `;
}

export default useManga;
