import { useCallback, useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import { FuzzyDate, Manga, Result } from '../types';
import { getNumberOfMonths } from '../utils';

const apiUrl = 'https://graphql.anilist.co';

const whitelist = ['Completed', 'Reading'];

export const useManga = (username: string) => {
  const [result, setResult] = useState<Result<Manga[]>>({
    status: 'loading',
  });

  const fetchManga = useCallback(async (username: string) => {
    try {
      const response = await request<Response>(apiUrl, query(username));

      const manga = response.MediaListCollection.lists
        .filter(({ name }) => whitelist.includes(name))
        .map((list) =>
          list.entries.map((entry) => ({
            id: entry.media.id,
            name:
              entry.media.title.english ??
              entry.media.title.romaji ??
              entry.media.title.native,
            color: entry.media.coverImage.color,
            image: entry.media.coverImage.medium,
            start: getNumberOfMonths(entry.startedAt),
            end: getNumberOfMonths(entry.completedAt),
          }))
        )
        .flat();

      setResult({ status: 'success', result: manga });
    } catch (e) {
      setResult({ status: 'failure' });
    }
  }, []);

  useEffect(() => {
    setResult({ status: 'loading' });

    fetchManga(username);
  }, [fetchManga, username]);

  return result;
};

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

function query(userName: string) {
  return gql`
    {
      MediaListCollection(userName: "${userName}", type: MANGA) {
        lists {
          name
          entries {
            startedAt {
              year
              month
            }
            completedAt {
              year
              month
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
  `;
}
