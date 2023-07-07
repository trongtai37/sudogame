import { toExtraSequentialVar } from './to-variable';
import { Encoder } from './interface';
import { uuid } from '../utils';

export class Sequential implements Encoder {
  exactOne(variables: string[]): string[][] {
    const n = variables.length;
    const clauses: string[][] = [variables];
    const identity = uuid();

    clauses.push([`-${variables[0]}`, toExtraSequentialVar(identity, 0)]);
    clauses.push([
      `-${variables[n - 1]}`,
      `-${toExtraSequentialVar(identity, n - 2)}`,
    ]);

    for (let i = 1; i <= n - 2; i++) {
      clauses.push([`-${variables[i]}`, toExtraSequentialVar(identity, i)]);
      clauses.push([
        `-${toExtraSequentialVar(identity, i - 1)}`,
        toExtraSequentialVar(identity, i),
      ]);
      clauses.push([
        `-${variables[i]}`,
        `-${toExtraSequentialVar(identity, i - 1)}`,
      ]);
    }

    return clauses;
  }
}

export function exactOneClausesWithSequentialEncoding(variables: string[]) {
  const n = variables.length;
  const clauses: string[][] = [variables];
  const identity = uuid();

  clauses.push([`-${variables[0]}`, toExtraSequentialVar(identity, 0)]);
  clauses.push([
    `-${variables[n - 1]}`,
    `-${toExtraSequentialVar(identity, n - 2)}`,
  ]);

  for (let i = 1; i <= n - 2; i++) {
    clauses.push([`-${variables[i]}`, toExtraSequentialVar(identity, i)]);
    clauses.push([
      `-${toExtraSequentialVar(identity, i - 1)}`,
      toExtraSequentialVar(identity, i),
    ]);
    clauses.push([
      `-${variables[i]}`,
      `-${toExtraSequentialVar(identity, i - 1)}`,
    ]);
  }

  return clauses;
}
