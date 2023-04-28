<script lang="ts">
export default {
  name: "MyButton",
};
</script>

<template>
  <button type="button" class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.637);
  box-shadow: 2px 2px 4px grey;
  border: solid 1px gray;
  padding: 0 15px;
}
.btn:hover {
  box-shadow: 2px 2px 4px black;
}
</style>
