export function toVariable(row: number, col: number, k: number) {
  return [row, col, k].join('_');
}

export function toExtraSequentialVar(identity: string, i: number) {
  return `${identity}_${i}`;
}
