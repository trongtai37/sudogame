// @ts-ignore
import * as Logic from 'logic-solver';
import { toVariable } from '../encoder';
import { Grid, SolveResult } from '../types';
import { BaseSolver } from './base-solver';

export class SpeedSolver extends BaseSolver {
  solve(clues: Grid): SolveResult {
    const variables: string[] = [];
    clues.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val > 0) {
          variables.push(toVariable(i + 1, j + 1, val));
        }
      });
    });

    const currentSol = this._satSolver.solveAssuming(Logic.and(variables));

    if (currentSol) {
      return {
        question: clues,
        solution: this.prettizeSolution(currentSol),
      };
    }

    return {
      question: clues,
      solution: null,
    };
  }
}
