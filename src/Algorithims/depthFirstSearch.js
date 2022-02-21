import { isValid } from "../util/isValid";

export const dfs = (grid, row, col, m, n, list) => {
  let stack = [[row, col]];

  while (stack.length > 0) {
    const [row, col] = stack.pop();
    const node = grid[row][col];
    node.isVisited = true;

    list.push([row, col]);

    if (node.isFinish) {
      return list;
    }

    if (isValid(grid, row - 1, col, m, n)) {
      stack.push([row - 1, col]);
    }
    if (isValid(grid, row, col + 1, m, n)) {
      stack.push([row, col + 1]);
    }
    if (isValid(grid, row + 1, col, m, n)) {
      stack.push([row + 1, col]);
    }
    if (isValid(grid, row, col - 1, m, n)) {
      stack.push([row, col - 1]);
    }
  }
  return list;
};
