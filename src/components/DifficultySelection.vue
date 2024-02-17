<script setup>
import { getDifficultyOptions } from "@/utils/sudokuHelpers";
import { ref } from "vue";

const selectedDifficulty = ref("hard");
</script>

<template>
  <div class="wrapper">
    <div
      class="selector"
      v-for="difficulty in getDifficultyOptions()"
      :key="difficulty"
    >
      <input
        type="radio"
        name="difficulty"
        :id="difficulty"
        v-model="selectedDifficulty"
        :value="difficulty"
      />
      <label class="difficulty-label" :for="difficulty">{{ difficulty }}</label>
    </div>
    <button class="button" @click="$emit('create-new', selectedDifficulty)">
      New
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
  padding-bottom: 16px;

  font-family: sans-serif;
  font-size: 17px;
  height: 32px;
  line-height: 20px;
}

.button {
  padding: 3px;
}

.selector .difficulty-label {
  border: 1px solid #bbb;
  padding: 5px;
  cursor: pointer;
  z-index: 90;
  border-radius: 5px;
  text-transform: capitalize;
}

.selector input[type="radio"] {
  display: none;
}

.selector input[type="radio"]:checked + .difficulty-label {
  background: rgba(76, 199, 252, 0.6);
}

.selector .difficulty-label:hover {
  background: rgba(122, 211, 250, 0.2);
}
</style>
