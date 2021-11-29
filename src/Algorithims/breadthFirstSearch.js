export const bfs = (grid, row, col, m, n, list) => {
  let queue = [[row, col]];

  while (queue.length > 0) {
    const [row, col] = queue.pop();
    const node = grid[row][col];
    console.log(grid[row][col].isVisited);

    grid[row][col] = { ...node, isVisited: true };

    console.log(row, col);

    list.push([row, col]);

    if (node.isFinish) {
      console.log("Finished!");
      return list;
    }

    if (isValid(grid, row - 1, col, m, n)) {
      queue.unshift([row - 1, col]);
    }
    if (isValid(grid, row, col + 1, m, n)) {
      queue.unshift([row, col + 1]);
    }
    if (isValid(grid, row + 1, col, m, n)) {
      queue.unshift([row + 1, col]);
    }
    if (isValid(grid, row, col - 1, m, n)) {
      queue.unshift([row, col - 1]);
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
