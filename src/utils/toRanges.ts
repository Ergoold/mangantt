import Manga from '../types/Manga';
import Range from '../types/Range';

const toRanges = (manga: Manga[]) => {
  const ranges = new Map<string, Range>();

  manga.forEach((manga) => {
    const key = JSON.stringify([manga.start, manga.end]);

    const mangaInRange = ranges.get(key);

    if (mangaInRange) {
      mangaInRange.manga.push(manga);
    } else {
      ranges.set(key, {
        start: manga.start,
        end: manga.end,
        manga: [manga],
      });
    }
  });

  return Array.from(ranges.values());
};

export default toRanges;
