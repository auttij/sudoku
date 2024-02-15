<template>
  <div class="grid">
    <div class="row" v-for="(row, rowIndex) in puzzle" :key="rowIndex">
      <sudoku-cell :cell="cell" :row="rowIndex" :col="colIndex"
        :invalid="cell.value && isCellInvalid(rowIndex, colIndex, cell.value)"
        :active="activeRow === rowIndex && activeCol === colIndex" v-for="(cell, colIndex) in row" :key="colIndex"
        @click="setCellActive(rowIndex, colIndex)" />
    </div>
  </div>
</template>

<script>
import SudokuCell from './SudokuCell.vue';

export default {
  name: 'SudokuGrid',
  components: {
    SudokuCell,
  },
  data() {
    return {
      almostComplete: ['123456789', '789123456', '456789123', '912345678', '6789.2345', '345678912', '567891234', '891234567', '234567891'],
      example: ['.8..62.5.', '6..3....8', '..38..4..', '1.....76.', '9.......1', '.78.....4', '..9..13..', '8....4..5', '.1.53..4.'],
      puzzle: [],
      activeRow: -1,
      activeCol: -1,
    }
  },
  created() {
    this.generatePuzzle()
    window.addEventListener('keydown', (e) => {
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        this.setCellValue(e.key);
      }
    })
  },
  computed: {
    cellSelected() {
      return this.activeRow >= 0 && this.activeCol >= 0;
    },
    activeValue() {
      if (this.cellSelected) {
        return this.puzzle[this.activeRow][this.activeCol];
      }
      return null;
    },
    matching() {
      return value => this.activeValue === value;
    }
  },
  methods: {
    generatePuzzle() {
      this.puzzle = this.example
        .map(row => {
          return row.split('').map(cell => {
            return {
              value: cell !== '.' ? parseInt(cell) : null,
              original: cell !== '.'
            }
          })
        })
    },
    setCellValue(inputKey) {
      const value = Number(inputKey)

      const r = this.activeRow;
      const c = this.activeCol;

      if (!(this.cellSelected) || this.puzzle[r][c].original) return
      if (this.activeValue === value) {
        this.puzzle[r][c].value = null;
        return
      }

      this.puzzle[r][c].value = value;

      if (this.isGameComplete()) {
        const msg = [
          'Success!',
          '',
        ]

        alert(msg.join('\n'))
        this.generatePuzzle();
      }
    },
    setCellActive(row, col) {
      if (this.activeRow === row && this.activeCol === col) {
        this.activeRow = -1
        this.activeCol = -1
        return
      }

      this.activeRow = row
      this.activeCol = col
      console.log(this.activeRow, this.activeCol);
    },
    isCellInvalid(row, col, value) {
      if (!value) {
        return true
      }

      for (let c = 0; c < 9; c += 1) {
        if (this.puzzle[row][c].value === value && c !== col) {
          return true
        }
      }

      for (let r = 0; r < 9; r += 1) {
        if (this.puzzle[r][col].value === value && r !== row) {
          return true
        }
      }

      const rowStart = Math.floor(row / 3) * 3
      const colStart = Math.floor(col / 3) * 3
      for (let r = rowStart; r < rowStart + 3; r += 1) {
        for (let c = colStart; c < colStart + 3; c += 1) {
          if (this.puzzle[r][c].value === value && !(r === row && c === col)) {
            return true
          }
        }
      }

      return false
    },
    isGameComplete() {
      for (let r = 0; r < 9; r += 1) {
        for (let c = 0; c < 9; c += 1) {
          if (this.isCellInvalid(r, c, this.puzzle[r][c].value)) {
            return false
          }
        }
      }

      return true
    }
  }

}
</script>

<style scoped>
.grid {
  width: calc(9 * 40px);
  margin: 0.5rem auto 1rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>