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
      const value = puzzle[r][c].value
      if (!value || isCellInvalid(puzzle, r, c, value)) {
        return false;
      }
    }
  }

  return true;
}

export const generatePuzzle = () => {
  // eslint-disable-next-line
  const almostComplete = [
    "123456789",
    "789123456",
    "456789123",
    "912345678",
    "6789.2345",
    "345678912",
    "567891234",
    "891234567",
    "234567891",
  ];
  // eslint-disable-next-line
  const example = [
    ".8..62.5.",
    "6..3....8",
    "..38..4..",
    "1.....76.",
    "9.......1",
    ".78.....4",
    "..9..13..",
    "8....4..5",
    ".1.53..4.",
  ];

  return example.map((row) => {
    return row.split("").map((cell) => {
      return {
        value: cell !== "." ? parseInt(cell) : null,
        original: cell !== ".",
        notes: [],
      };
    });
  });
}