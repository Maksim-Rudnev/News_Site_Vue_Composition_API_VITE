<script lang="ts">
export default {
  name: "MySpin",
};
</script>

<template>
  <div class="content">
    <div id="wrapper" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#wrapper {
  margin-top: 50px;
  color: #0d6efd;
  width: 120px;
  height: 120px;
  border-top-width: 10px;
  border-bottom-width: 10px;
  border-right-width: 10px;
  border-left-width: 10px;
  --bs-spinner-animation-speed: 0.3s;
}
</style>
