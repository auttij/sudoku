import { defineStore } from "pinia";
import { isGameComplete } from "./utils/sudokuHelpers";

export const useSudokuStore = defineStore({
  id: "sudoku",
  state: () => ({
    puzzle: new Array(),
    activeRow: -1,
    activeCol: -1,
    activeValue: -1,
    notesActive: false,
  }),
  getters: {
    canEdit(state) {
      return (state.activeRow >= 0 && state.activeCol >= 0) &&
        !state.puzzle[state.activeRow][state.activeCol].original
    }
  },
  actions: {
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
    toggleNotes() {
      this.notesActive = !this.notesActive;
    },
    handleCellEdit(inputKey) {
      const value = Number(inputKey);

      if (!this.canEdit) return;
      const cell = this.puzzle[this.activeRow][this.activeCol];

      if (this.notesActive)
        this.setCellNotes(cell, value);
      else
        this.setCellValue(cell, value);
    },
    setCellNotes(cell, value) {
      if (cell.notes.includes(value)) {
        const index = cell.notes.indexOf(value);
        cell.notes.splice(index, 1);
        return;
      }
      cell.notes.push(value);
    },
    setCellValue(cell, value) {
      if (cell.value === value) {
        cell.value = null;
        return;
      }

      cell.value = value;
      cell.notes.length = 0;

      this.removeNotes(value);
      if (isGameComplete(this.puzzle)) {
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
  },
});
