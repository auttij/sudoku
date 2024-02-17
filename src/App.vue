<template>
  <h1>Sudoku</h1>
  <SudokuGrid />
</template>

<script>
import SudokuGrid from "./components/SudokuGrid.vue";

export default {
  name: "App",
  components: {
    SudokuGrid,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input,
button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
</style>
