export const isCellInvalid = (puzzle, row, col, value) => {
  if (!value) {
    return true;
  }

  for (let c = 0; c < 9; c += 1) {
    if (puzzle[row][c].value === value && c !== col) {
      return true;
    }
  }

  for (let r = 0; r < 9; r += 1) {
    if (puzzle[r][col].value === value && r !== row) {
      return true;
    }
  }

  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;
  for (let r = rowStart; r < rowStart + 3; r += 1) {
    for (let c = colStart; c < colStart + 3; c += 1) {
      if (puzzle[r][c].value === value && !(r === row && c === col)) {
        return true;
      }
    }
  }

  return false;
}

export const isGameComplete = (puzzle) => {
  for (let r = 0; r < 9; r += 1) {
    for (let c = 0; c < 9; c += 1) {
      if (isCellInvalid(puzzle, r, c, puzzle[r][c].value)) {
        return false;
      }
    }
  }

  return true;
}