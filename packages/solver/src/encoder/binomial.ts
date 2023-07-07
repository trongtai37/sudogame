import { Encoder } from './interface';

export class Binominal implements Encoder {
  exactOne(variables: string[]): string[][] {
    const clauses: string[][] = [variables];

    for (let i = 0; i < variables.length - 1; i++) {
      for (let j = i + 1; j < variables.length; j++) {
        clauses.push([`-${variables[i]}`, `-${variables[j]}`]);
      }
    }

    return clauses;
  }
}

export function exactOneClausesWithBinomialEncoding(variables: string[]) {
  const clauses: string[][] = [variables];

  for (let i = 0; i < variables.length - 1; i++) {
    for (let j = i + 1; j < variables.length; j++) {
      clauses.push([`-${variables[i]}`, `-${variables[j]}`]);
    }
  }

  return clauses;
}
