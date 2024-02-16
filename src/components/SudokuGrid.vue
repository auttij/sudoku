<script setup>
import { useSudokuStore } from "../store.js";
import { storeToRefs } from "pinia";
import SudokuCell from "./SudokuCell.vue";
const store = useSudokuStore();

const { puzzle, activeRow, activeCol } = storeToRefs(store);
const { setCellActive } = store;

// eslint-disable-next-line
const { setCellValue, generatePuzzle } = store;
function moveActiveCellValue(directionKey) {
  let dr = 0;
  let dc = 0;

  switch (directionKey) {
    case "ArrowRight":
      dc += 1;
      break;
    case "ArrowLeft":
      dc -= 1;
      break;
    case "ArrowDown":
      dr += 1;
      break;
    case "ArrowUp":
      dr -= 1;
      break;
    default:
      break;
  }

  const newRow = activeRow.value + dr;
  const newCol = activeCol.value + dc;

  if (0 <= newRow && newRow < 9 && 0 <= newCol && newCol < 9)
    setCellActive(newRow, newCol);
}

generatePuzzle();
window.addEventListener("keydown", (e) => {
  if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
    setCellValue(e.key);
  } else if (
    ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)
  ) {
    moveActiveCellValue(e.key);
  }
});
</script>

<template>
  <div class="grid">
    <div class="row" v-for="(row, rowIndex) in puzzle" :key="rowIndex">
      <sudoku-cell
        :cell="cell"
        :row="rowIndex"
        :col="colIndex"
        v-for="(cell, colIndex) in row"
        :key="colIndex"
      />
    </div>
  </div>
</template>

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