import { request, gql } from 'graphql-request';
import { Response } from './types';
import { getNumberOfMonths } from '../../utils';

const apiUrl = 'https://graphql.anilist.co';

const whitelist = ['Completed', 'Reading'];

export const fetchManga = async (username: string) => {
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

    return { status: 'success', result: manga } as const;
  } catch (e) {
    return { status: 'failure' } as const;
  }
};

const query = (userName: string) =>
  gql`
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
