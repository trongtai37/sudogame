// @ts-ignore
import * as Logic from 'logic-solver';
import { BOARD_VAR_PATTERN } from './../consts';
import { Encoder, Sequential, toVariable } from '../encoder';
import { Grid } from '../types';
import { chunk, forcePuzzleSize } from '../utils';

export class BaseSolver {
  private readonly _size: number;
  private readonly _gridSize: number;
  private readonly _clauses: string[][] = [];
  private readonly _encoder: Encoder;

  protected readonly _satSolver: any;

  constructor({ size }: { size: number }) {
    forcePuzzleSize(size);

    this._size = size;
    this._gridSize = size * size;
    this._clauses = [];
    this._satSolver = new Logic.Solver();
    this._encoder = new Sequential();

    this.addClausesForCellConstraints()
      .addClausesForRowConstraints()
      .addClausesForColumnConstraints()
      .addClausesForSubmatrixConstraints();
  }

  private addClausesForCellConstraints() {
    //  Each box contains precisely one number.
    for (let row = 1; row <= this._gridSize; row++) {
      for (let col = 1; col <= this._gridSize; col++) {
        let variables: string[] = [];
        for (let k = 1; k <= this._gridSize; k++) {
          variables.push(toVariable(row, col, k));
        }

        const clauses = this._encoder.exactOne(variables);
        this._clauses.concat(clauses);
        clauses.forEach((clause) => this._satSolver.require(Logic.or(clause)));
      }
    }

    return this;
  }

  private addClausesForRowConstraints() {
    // Precisely once in each row (fix i ):
    for (let row = 1; row <= this._gridSize; row++) {
      for (let k = 1; k <= this._gridSize; k++) {
        let variables: string[] = [];
        for (let col = 1; col <= this._gridSize; col++) {
          variables.push(toVariable(row, col, k));
        }

        const clauses = this._encoder.exactOne(variables);
        this._clauses.concat(clauses);
        clauses.forEach((clause) => this._satSolver.require(Logic.or(clause)));
      }
    }

    return this;
  }

  private addClausesForColumnConstraints() {
    // Precisely once in each colum (fix j):
    for (let col = 1; col <= this._gridSize; col++) {
      for (let k = 1; k <= this._gridSize; k++) {
        let variables: string[] = [];
        for (let row = 1; row <= this._gridSize; row++) {
          variables.push(toVariable(row, col, k));
        }

        const clauses = this._encoder.exactOne(variables);
        this._clauses.concat(clauses);
        clauses.forEach((clause) => this._satSolver.require(Logic.or(clause)));
      }
    }

    return this;
  }

  private addClausesForSubmatrixConstraints() {
    // Precisely once in each sub-3x3 matrix.
    for (let rowPart = 1; rowPart <= this._gridSize; rowPart += this._size) {
      for (let colPart = 1; colPart <= this._gridSize; colPart += this._size) {
        for (let k = 1; k <= this._gridSize; k++) {
          let variables: string[] = [];
          for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
              const row = rowPart + i;
              const col = colPart + j;

              variables.push(toVariable(row, col, k));
            }
          }
          const clauses = this._encoder.exactOne(variables);
          this._clauses.concat(clauses);
          clauses.forEach((clause) =>
            this._satSolver.require(Logic.or(clause)),
          );
        }
      }
    }

    return this;
  }

  prettizeSolution(currentSol: any): Grid {
    return chunk(
      currentSol
        .getTrueVars()
        .filter((variable: string) => BOARD_VAR_PATTERN.test(variable))
        .sort()
        .map((variable: string) => Number(variable.split('_').pop())),
      this._gridSize,
    );
  }
}
