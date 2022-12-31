import { useCallback, useEffect, useState } from 'react';
import { fetchManga } from './fetchManga';
import { Manga, Result } from '../../types';

export const useManga = (username: string) => {
  const [result, setResult] = useState<Result<Manga[]>>({
    status: 'loading',
  });

  const setManga = useCallback(async (username: string) => {
    setResult(await fetchManga(username));
  }, []);

  useEffect(() => {
    setResult({ status: 'loading' });

    setManga(username);
  }, [setManga, username]);

  return result;
};
