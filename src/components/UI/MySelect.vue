<script lang="ts">
import type { ISortOptions } from "@/interfaces";
export default {
  name: "MySelect",
};
</script>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  options: {
    type: Array<ISortOptions>,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const changeOption = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <select class="select" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
.select {
  background-color: transparent;
  box-shadow: 2px 2px 4px grey;
  border: solid 1px gray;
  height: 39px;
  border-radius: 5px;
}
.select:focus-visible {
  outline: none;
}
</style>
