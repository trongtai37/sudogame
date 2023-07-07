// @ts-ignore
import * as Logic from 'logic-solver';
import { toVariable } from '../encoder';
import { Grid, SolveResult } from '../types';
import { BaseSolver } from './base-solver';
import { forceValidPuzzle } from '../utils';

export class LazySolver extends BaseSolver {
  private readonly _clues: Grid;
  private readonly _generator: Generator<SolveResult, null, unknown>;

  constructor({ size, clues }: { size: number; clues: Grid }) {
    if (clues.length) {
      forceValidPuzzle({
        size,
        grid: clues,
      });
    }
    super({
      size,
    });
    this._clues = clues;
    this._generator = this.createSolutionGenerator();
  }

  get generator() {
    return this._generator;
  }

  private *createSolutionGenerator(): Generator<SolveResult, null, unknown> {
    const variables: string[] = [];
    this._clues.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val > 0) {
          variables.push(toVariable(i + 1, j + 1, val));
        }
      });
    });

    this._satSolver.require(Logic.and(variables));

    let currentSol;
    while ((currentSol = this._satSolver.solve())) {
      if (currentSol) {
        this._satSolver.forbid(currentSol.getFormula());
        yield {
          solution: this.prettizeSolution(currentSol),
          question: this._clues,
        };
      } else {
        return null;
      }
    }

    return null;
  }
}
