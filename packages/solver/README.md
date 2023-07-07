# Sudogame

✨ **A new fast, light and comprehensive Sudoku library, powered by SAT encoding!** ✨

Sudogame is a fast, light, and comprehensive Sudoku library powered by SAT encoding. With Sudogame, you can quickly and easily generate, solve, and validate Sudoku puzzles in your own projects.

## Features

- Fast and efficient Sudoku generation and solving algorithms
- Support for puzzles of all sizes, including standard 9x9 puzzles and larger grids
- Comprehensive validation and error checking to ensure the correctness of generated puzzles
- Built-in support for SAT solvers to enable even faster puzzle generation and solving

## Installation

- With `npm`:

```bash
  npm install sudogame
```

- With `yarn`:

```bash
  yarn add sudogame
```

- With `pnpm`:

```bash
  pnpm add sudogame
```

## Usage

### Speed solver

The `SpeedSolver` class provides a fast and efficient algorithm for solving Sudoku puzzles. Here's an example of how to use it:

```ts
import { SpeedSolver } from 'sudogame';

// Create a new 9x9 Sudoku puzzle
const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Solve the puzzle using the SpeedSolver
const solver = new SpeedSolver({ size: 3 });
const result = solver.solve(puzzle);
// {
//   question: [
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9],
//   ],
//   solution: [
//     [5, 3, 4, 6, 7, 8, 9, 1, 2 ],
//     [6, 7, 2, 1, 9, 5, 3, 4, 8 ],
//     [1, 9, 8, 3, 4, 2, 5, 6, 7 ],
//     [8, 5, 9, 7, 6, 1, 4, 2, 3 ],
//     [4, 2, 6, 8, 5, 3, 7, 9, 1 ],
//     [7, 1, 3, 9, 2, 4, 8, 5, 6 ],
//     [9, 6, 1, 5, 3, 7, 2, 8, 4 ],
//     [2, 8, 7, 4, 1, 9, 6, 3, 5 ],
//     [3, 4, 5, 2, 8, 6, 1, 7, 9 ]
//   ]
// }s
```

### Lazy Solver

The LazySolver class is designed to find all possible solutions of the puzzle. Here's an example of how to use it:

```ts
import { LazySolver } from 'sudogame';

const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solver = new LazySolver({ size: 3, clues: puzzle });
const resultGenerator = solver.generator;
for (const result of resultGenerator) {
  console.log(result);
}
```

### Generator

The Generator class provides a way to generate new Sudoku puzzles. Here's an example of how to use it:

```ts
import { Generator } from 'sudogame';

// Generate a new 9x9 Sudoku puzzle
const generator = new Generator(3);
console.log(generator.make());
```

<!-- ## Contributing
If you'd like to contribute to Sudogame, you can submit a pull request through the project's GitHub repository. Before submitting a pull request, please ensure that your changes pass the project's existing unit tests. -->

## License

`Sudogame` is licensed under the MIT License. See the LICENSE file for more information.
