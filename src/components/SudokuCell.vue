<template>
  <div class="cell" :class="{
    'border-right': col === 2 || col == 5,
    'border-bottom': row === 2 || row == 5,
    'original': cell.original,
    'active': active,
    'invalid': invalid,
  }" @click="$emit('click')">
    {{ cell.value }}
  </div>
</template>

<script>
export default {
  name: 'SudokuCell',
  props: {
    cell: Object,
    row: Number,
    col: Number,
    invalid: Boolean,
    active: Boolean,
  },
}
</script>

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

.cell.invalid {
  background-color: #c00;
  color: #fff;
}
</style>