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
const { setCellActive } = store;
const invalid = false;
</script>

<template>
  <div
    class="cell"
    :class="{
      'border-right': col === 2 || col == 5,
      'border-bottom': row === 2 || row == 5,
      original: cell.original,
      active: row === activeRow && col === activeCol,
      matching: cell.value && activeValue.value == cell.value,
      invalid: invalid,
    }"
    @click="setCellActive(row, col)"
  >
    {{ cell.value }}
  </div>
</template>

<style scoped>
.cell {
  display: block;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #bbb;

  font-size: 24px;
  line-height: 40px;
  text-align: center;

  cursor: default;
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
  background-color: #0060df !important;
  color: #fff;
}

.cell.matching {
  background-color: #94bef4;
  color: #fff;
}

.cell.invalid {
  background-color: #c00;
  color: #fff;
}
</style>