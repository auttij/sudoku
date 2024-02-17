<script setup>
import { onMounted, onUnmounted } from "vue";
import { useSudokuStore } from "../store.js";
import { storeToRefs } from "pinia";
import { generatePuzzle } from "@/utils/sudokuHelpers";
import SudokuCell from "./SudokuCell.vue";
const store = useSudokuStore();

const { puzzle, activeRow, activeCol, notesActive, gameFinished } = storeToRefs(store);
const { handleCellEdit, setCellActive, toggleNotes, setPuzzle } = store;
function moveActiveCellValue(directionKey) {
  let dr = (directionKey === "ArrowDown") - (directionKey === "ArrowUp");
  let dc = (directionKey === "ArrowRight") - (directionKey === "ArrowLeft");
  const newRow = ((activeRow.value + dr % 9) + 9) % 9;
  const newCol = ((activeCol.value + dc % 9) + 9) % 9;
  setCellActive(newRow, newCol);
}

function newPuzzle() {
  const puzzle = generatePuzzle("hard");
  setPuzzle(puzzle);
}
function handleGameFinished() {
  const msg = ["Success!", ""];
  alert(msg.join("\n"));
  newPuzzle();
}
function handleKeydownEvent(e) {
  if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
    handleCellEdit(e.key);
    if (gameFinished.value)
      handleGameFinished();
  } else if (
    ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)
  ) {
    moveActiveCellValue(e.key);
  } else if (
    e.key === "n"
  ) {
    toggleNotes()
  }
}

onMounted(() => {
  newPuzzle();
  window.addEventListener("keydown", handleKeydownEvent)
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydownEvent);
})
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
  <label class="container"
    >Notes
    <input type="checkbox" id="checkbox" v-model="notesActive" @click="toggleNotes" />
    <span for="checkbox"></span>
  </label>
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