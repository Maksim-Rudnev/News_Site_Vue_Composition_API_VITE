<script lang="ts">
export default {
  name: "MyDialog",
};
</script>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(["update:show"]);

const hideDialog = () => {
  emit("update:show", false);
};
</script>

<template>
  <div v-if="show" class="dialog" @click="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dialog {
  z-index: 3;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
