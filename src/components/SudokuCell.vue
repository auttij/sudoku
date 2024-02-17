<script setup>
import { useSudokuStore } from "../store.js";
import { storeToRefs } from "pinia";
defineProps({
  cell: Object,
  row: Number,
  col: Number,
});

const store = useSudokuStore();
const { activeRow, activeCol, activeValue } = storeToRefs(store);
const { setCellActive, isCellInvalid } = store;
</script>

<template>
  <div
    class="cell"
    :class="{
      'border-right': col === 2 || col == 5,
      'border-bottom': row === 2 || row == 5,
      original: cell.original,
      invalid: cell.value && isCellInvalid(row, col, cell.value),
      active: row === activeRow && col === activeCol,
      matching:
        (cell.value && activeValue.value == cell.value) ||
        cell.notes.includes(activeValue.value),
      highlight: row === activeRow || col === activeCol,
    }"
    @click="setCellActive(row, col)"
  >
    <div v-if="cell.value" class="value">
      {{ cell.value }}
    </div>
    <div class="notes" v-else-if="cell.notes.length">
      <div class="note" v-for="index in 9" :key="index">
        {{ cell.notes.includes(index) ? index : null }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.cell {
  display: block;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #bbb;

  cursor: default;
}

.cell .value {
  font-size: 24px;
  line-height: 40px;
  text-align: center;
}

.cell .notes {
  padding: 2px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.cell .notes .note {
  font-size: 11px;
  width: 8px;
  line-height: 8px;
  min-height: 8px;
}

.cell.border-right {
  border-right-width: 3px;
}

.cell.border-bottom {
  border-bottom-width: 3px;
}

.cell.original {
  font-weight: bold;
}

.cell.active {
  color: #fff;
}

.cell.active:not(.invalid) {
  background-color: #21BAFC !important;
}

.cell.matching {
  background-color: rgba(76, 199, 252, 0.6);
}

.cell.invalid {
  background-color: rgba(255, 67, 23, 0.8) !important;
}

.cell.highlight:not(.active):not(.matching):not(.invalid) {
  background-color: rgba(122, 211, 250, 0.2)
}
</style>