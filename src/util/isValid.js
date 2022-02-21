export const isValid = (grid, row, col, m, n) => {
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
