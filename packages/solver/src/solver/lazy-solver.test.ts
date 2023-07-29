import { describe, it } from 'vitest';
import { LazySolver } from './lazy-solver';

describe.concurrent('LazySolver tests', () => {
  it('should generate all valid solutions', ({ expect }) => {
    const clues = [
      [0, 0, 3, 0, 2, 0, 6, 0, 0],
      [9, 0, 0, 3, 0, 5, 0, 0, 1],
      [0, 0, 1, 8, 0, 6, 4, 0, 0],
      [0, 0, 8, 1, 0, 2, 9, 0, 0],
      [7, 0, 0, 0, 0, 0, 0, 0, 8],
      [0, 0, 6, 7, 0, 8, 2, 0, 0],
      [0, 0, 2, 6, 0, 9, 5, 0, 0],
      [8, 0, 0, 2, 0, 3, 0, 0, 9],
      [0, 0, 5, 0, 1, 0, 3, 0, 0],
    ];
    const solution = [
      [4, 8, 3, 9, 2, 1, 6, 5, 7],
      [9, 6, 7, 3, 4, 5, 8, 2, 1],
      [2, 5, 1, 8, 7, 6, 4, 9, 3],
      [5, 4, 8, 1, 3, 2, 9, 7, 6],
      [7, 2, 9, 5, 6, 4, 1, 3, 8],
      [1, 3, 6, 7, 9, 8, 2, 4, 5],
      [3, 7, 2, 6, 8, 9, 5, 1, 4],
      [8, 1, 4, 2, 5, 3, 7, 6, 9],
      [6, 9, 5, 4, 1, 7, 3, 8, 2],
    ];
    const solver = new LazySolver({ size: 3, clues });
    const generator = solver.generator;
    let count = 0;

    for (const result of generator) {
      expect(result.solution).toEqual(solution);
      expect(result.question).toEqual(clues);
      count++;
    }

    expect(count).toEqual(1);
  });

  it('should throw error if size and clues not match', ({ expect }) => {
    const clues = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    expect(() => new LazySolver({ size: 4, clues })).toThrowError(
      /^Puzzle and size are not match\.$/,
    );
  });

  it('returns null if there is no solution', ({ expect }) => {
    const clues = [
      [1, 2, 3, 4],
      [2, 0, 4, 1],
      [3, 4, 0, 2],
      [4, 1, 2, 3],
    ];
    const solver = new LazySolver({ size: 2, clues });
    const generator = solver.generator;
    const solution = generator.next();

    expect(solution.value).toBeNull();
  });
});
