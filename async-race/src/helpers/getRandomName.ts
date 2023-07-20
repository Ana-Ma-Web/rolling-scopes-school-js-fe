import { capitalisation } from './capitalisation';
import { getRandomNumber } from './getRandomNumber';

const firstVowels = 'a, e, i, o, u, y, ea, eo, io, ao, aa, ee, oo';
const lastVowels = 'a, o, y, a, o, y, ia, ea, io, ia, yo, ya';
const consonants =
  'b, c, d, f, g, h, k, l, m, n, p, r, s, t, v, w, x, z, th, sh, ch, br, fr, cr, dr, gr, pr, tr, vr, wr, xr, zr, sm, sn, hn, gn';

const randomItem = (strLetters: string): string => {
  const arr = strLetters.split(', ');
  const index = getRandomNumber(arr.length);
  return arr[index];
};

export const getRandomName = (): string => {
  let name = '';
  const syllableCount = getRandomNumber(2) + 3;
  const endingType = getRandomNumber(2);

  for (let i = 0; i < syllableCount; i += 1) {
    if (!(i % 2)) {
      name += randomItem(consonants);
    } else name += randomItem(firstVowels);

    if (i === syllableCount - 1 && !(i % 2)) {
      name += endingType ? randomItem(lastVowels) : '';
    }
  }

  return capitalisation(name);
};
