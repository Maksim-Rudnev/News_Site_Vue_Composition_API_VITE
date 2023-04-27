<script lang="ts">
export default {
  name: "MyButton",
};
</script>

<template>
  <button type="button" class="btn btn-outline-info">
    <slot />
  </button>
</template>

<style scoped>
.btn-outline-info {
  text-decoration: underline;
  --bs-btn-color: black;
  --bs-btn-border-color: transparent;
  --bs-btn-hover-color: black;
  --bs-btn-hover-bg: transparent;
  --bs-btn-hover-border-color: black;
  --bs-btn-focus-shadow-rgb: 13, 202, 240;
  --bs-btn-active-color: white;
  --bs-btn-active-bg: black;
  --bs-btn-active-border-color: black;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: teal;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: teal;
  --bs-gradient: none;
}

.btn:hover {
  text-decoration: none;
}
</style>
