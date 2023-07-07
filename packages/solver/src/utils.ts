import type { Grid } from './types';

export function chunk<T>(array: T[], size: number) {
  let res: T[][] = [];
  for (let point = 0; point < array.length; point += size) {
    res.push(array.slice(point, point + size));
  }

  return res;
}

export function randomInt(from: number, to: number) {
  const range = to - from;
  return from + Math.floor(Math.random() * range);
}

export function forcePuzzleSize(size: number): true {
  if (size <= 1 || size >= 8) {
    throw new Error('Only support size from 2 to 7.');
  }
  return true;
}

export function forceValidPuzzle({
  size,
  grid,
}: {
  size: number;
  grid: Grid;
}): boolean {
  forcePuzzleSize(size);

  if (
    grid.length !== size * size ||
    grid.some((row) => row.length !== size * size)
  ) {
    throw new Error('Puzzle and size are not match.');
  }

  if (grid.some((row) => row.some((cell) => cell < 0 || cell > size * size))) {
    throw new Error('Invalid value on puzzle, out of range.');
  }

  return true;
}

export function uuid() {
  var uuid = '',
    i,
    random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += '-';
    }
    uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}
