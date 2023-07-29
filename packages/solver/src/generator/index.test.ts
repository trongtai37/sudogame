import { describe, it } from 'vitest';
import { Generator } from './index';

describe.concurrent('Generator tests', () => {
  it('should create an instance with a make method', ({ expect }) => {
    const size = 3;
    const generator = new Generator(size);

    expect(generator).toHaveProperty('make');
    expect(generator.make).instanceOf(Function);
  });

  it('should throw error when initialize with invalid size', ({ expect }) => {
    expect(() => new Generator(-1)).toThrowError(
      /^Only support size from 2 to 7\.$/,
    );
    expect(() => new Generator(0)).toThrowError(
      /^Only support size from 2 to 7\.$/,
    );
    expect(() => new Generator(1)).toThrowError(
      /^Only support size from 2 to 7\.$/,
    );
    expect(() => new Generator(8)).toThrowError(
      /^Only support size from 2 to 7\.$/,
    );
  });

  it('should create a puzzle with board size is 9 when passing size is 3 to Generator', ({
    expect,
  }) => {
    const generator = new Generator(3);
    const puzzle = generator.make();

    expect(puzzle.question).toHaveLength(9);
    for (const row of puzzle.question) {
      expect(row).toHaveLength(9);
    }

    expect(puzzle.solution).toHaveLength(9);
    // @ts-ignore
    for (const row of puzzle.solution) {
      expect(row).toHaveLength(9);
    }
  });
});
