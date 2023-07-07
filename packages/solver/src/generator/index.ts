import { LazySolver } from '../solver/lazy-solver';
import { GameLevel, GeneratorResult } from '../types';
import { forcePuzzleSize, randomInt } from '../utils';

export class Generator {
  private readonly _size: number;
  private readonly _generator: LazySolver['_generator'];

  constructor(size: number) {
    forcePuzzleSize(size);
    this._generator = new LazySolver({
      size,
      clues: [],
    }).generator;
    this._size = size;
  }

  make(level?: GameLevel): GeneratorResult {
    const gridSize = this._size * this._size;
    const set = new Set<string>();
    const numOfClues = 8;

    const result = this._generator.next();

    if (result.done) {
      return {
        question: [],
        solution: null,
      };
    }

    while (set.size < numOfClues) {
      const rowIndex = randomInt(0, gridSize - 1);
      const colIndex = randomInt(0, gridSize - 1);

      set.add(`${rowIndex}_${colIndex}`);
    }

    const question = result.value.solution!.map((row) => Array.from(row));

    question.forEach((row, i) => {
      row.forEach((_, j) => {
        if (!set.has(`${i}_${j}`)) {
          question[i][j] = 0;
        }
      });
    });

    return {
      question,
      solution: result.value.solution,
    };
  }
}
