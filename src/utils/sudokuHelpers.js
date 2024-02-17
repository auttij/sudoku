import { getSudoku } from "sudoku-gen";

export const getDifficultyOptions = () => {
  return ["easy", "medium", "hard", "expert"];
};

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
};

export const isGameComplete = (puzzle) => {
  for (let r = 0; r < 9; r += 1) {
    for (let c = 0; c < 9; c += 1) {
      const value = puzzle[r][c].value;
      if (!value || isCellInvalid(puzzle, r, c, value)) {
        return false;
      }
    }
  }

  return true;
};

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

export const generatePuzzle = (difficulty) => {
  const sudokuObj = getSudoku(difficulty);
  const puzzle = chunkSubstr(sudokuObj.puzzle, 9);
  return puzzle.map((row) => {
    return row.split("").map((cell) => {
      return {
        value: cell !== "-" ? parseInt(cell) : null,
        original: cell !== "-",
        notes: [],
      };
    });
  });
};
