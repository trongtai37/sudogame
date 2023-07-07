export type EncodingType = 'BINOMIAL' | 'SEQUENTIAL';
export type GameLevel = 'easy' | 'medium' | 'hard';
export type Grid = number[][];
export type SolveResult =
  | {
      solution: Grid;
      question: Grid;
    }
  | {
      solution: null;
      question: Grid;
    };

export type GeneratorResult = SolveResult;
