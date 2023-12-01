import { gql, request } from 'graphql-request';
import { Response } from './types';
import { apiUrl } from '../../config';
import { getNumberOfMonths } from '../../utils';

const whitelist = ['Completed', 'Reading'];

export const fetchManga = async (username: string) => {
  try {
    const response = await request<Response>(apiUrl, query(username));

    const manga = response.MediaListCollection.lists
      .filter(({ name }) => whitelist.includes(name))
      .flatMap(({ entries }) =>
        entries.map(({ startedAt, completedAt, media }) => ({
          id: media.id,
          name: media.title.english ?? media.title.romaji ?? media.title.native,
          color: media.coverImage.color,
          image: media.coverImage.medium,
          start: getNumberOfMonths(startedAt),
          end: getNumberOfMonths(completedAt),
        })),
      );

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
