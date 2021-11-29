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

const isValid = (grid, row, col, m, n) => {
  if (
    row < 0 ||
    col < 0 ||
    row >= m ||
    col >= n ||
    grid[row][col].isWall ||
    grid[row][col].isVisited
  ) {
    return false;
  }

  return true;
};
