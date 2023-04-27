<script lang="ts">
export default {
  name: "MyInput",
};
</script>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input :value="modelValue" type="text" class="input" @input="updateInput" />
</template>

<style scoped>
.input {
  width: 100%;
  background-color: transparent;
  box-shadow: 2px 2px 4px grey;
  border: solid 1px gray;
  padding: 5px 15px;
  border-radius: 5px;
}
.input:focus-visible {
  outline: none;
}
</style>
