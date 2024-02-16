import { defineStore } from "pinia";

export const useSudokuStore = defineStore({
  id: "sudoku",
  state: () => ({
    puzzle: new Array(),
    activeRow: -1,
    activeCol: -1,
    activeValue: -1,
    notesActive: false,
  }),
  actions: {
    toggleNotes() {
      this.notesActive = !this.notesActive;
    },
    setCellActive(row, col) {
      if (this.activeRow === row && this.activeCol === col) {
        this.activeRow = -1;
        this.activeCol = -1;
        this.activeValue = -1;
      } else {
        this.activeRow = row;
        this.activeCol = col;
        this.activeValue = this.puzzle[row][col];
      }
    },
    setPuzzle(puzzle) {
      this.puzzle = puzzle;
    },
    generatePuzzle() {
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

      const puzzle = example.map((row) => {
        return row.split("").map((cell) => {
          return {
            value: cell !== "." ? parseInt(cell) : null,
            original: cell !== ".",
            notes: [],
          };
        });
      });
      this.setPuzzle(puzzle);
    },
    isCellInvalid(row, col, value) {
      if (!value) {
        return true;
      }

      for (let c = 0; c < 9; c += 1) {
        if (this.puzzle[row][c].value === value && c !== col) {
          return true;
        }
      }

      for (let r = 0; r < 9; r += 1) {
        if (this.puzzle[r][col].value === value && r !== row) {
          return true;
        }
      }

      const rowStart = Math.floor(row / 3) * 3;
      const colStart = Math.floor(col / 3) * 3;
      for (let r = rowStart; r < rowStart + 3; r += 1) {
        for (let c = colStart; c < colStart + 3; c += 1) {
          if (this.puzzle[r][c].value === value && !(r === row && c === col)) {
            return true;
          }
        }
      }

      return false;
    },
    isGameComplete() {
      for (let r = 0; r < 9; r += 1) {
        for (let c = 0; c < 9; c += 1) {
          if (this.isCellInvalid(r, c, this.puzzle[r][c].value)) {
            return false;
          }
        }
      }

      return true;
    },
    setCellValue(inputKey) {
      const value = Number(inputKey);

      if (
        !(this.activeRow >= 0 && this.activeCol >= 0) ||
        this.puzzle[this.activeRow][this.activeCol].original
      ) {
        return;
      }

      const cell = this.puzzle[this.activeRow][this.activeCol];
      if (this.notesActive && cell.notes.includes(value)) {
        const index = cell.notes.indexOf(value);
        cell.notes.splice(index, 1);
        return;
      } else if (cell.value === value) {
        cell.value = null;
        return;
      }

      if (this.notesActive) {
        cell.notes.push(value);
      } else {
        cell.value = value;
        cell.notes.length = 0;
        this.removeNotes(value);
      }

      if (this.isGameComplete()) {
        const msg = ["Success!", ""];

        alert(msg.join("\n"));
        this.generatePuzzle();
      }
    },
    removeNotes(value) {
      for (let r = 0; r < 9; r += 1) {
        const cell = this.puzzle[r][this.activeCol];
        const idx = cell.notes.indexOf(value);
        if (idx >= 0) {
          cell.notes.splice(idx, 1);
        }
      }

      for (let c = 0; c < 9; c += 1) {
        const cell = this.puzzle[this.activeRow][c];
        const idx = cell.notes.indexOf(value);
        if (idx >= 0) {
          cell.notes.splice(idx, 1);
        }
      }

      const rowStart = Math.floor(this.activeRow / 3) * 3;
      const colStart = Math.floor(this.activeCol / 3) * 3;
      for (let r = rowStart; r < rowStart + 3; r += 1) {
        for (let c = colStart; c < colStart + 3; c += 1) {
          const cell = this.puzzle[r][c];
          const idx = cell.notes.indexOf(value);
          if (idx >= 0) {
            cell.notes.splice(idx, 1);
          }
        }
      }
    },
  },
});
