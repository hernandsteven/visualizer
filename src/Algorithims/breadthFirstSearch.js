import { isValid } from "../util/isValid";

export const bfs = (grid, row, col, m, n, list) => {
  let queue = [[row, col]];

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    const node = grid[row][col];

    if (node.isVisited) continue;
    node.isVisited = true;

    list.push([row, col]);

    if (node.isFinish) {
      return list;
    }

    if (isValid(grid, row - 1, col, m, n)) {
      queue.push([row - 1, col]);
    }
    if (isValid(grid, row, col + 1, m, n)) {
      queue.push([row, col + 1]);
    }
    if (isValid(grid, row + 1, col, m, n)) {
      queue.push([row + 1, col]);
    }
    if (isValid(grid, row, col - 1, m, n)) {
      queue.push([row, col - 1]);
    }
  }
  return list;
};
