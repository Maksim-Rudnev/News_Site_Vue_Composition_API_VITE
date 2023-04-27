<script setup lang="ts">
import PostItem from "./PostItem.vue";

import type { IPost } from "@/interfaces";

defineProps({
  posts: {
    type: Array<IPost>,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="header-news">
    <h3 v-if="posts.length > 0">Список новостей</h3>
    <h3 v-else>Новости отсутствуют</h3>
  </div>
  <div v-if="posts.length > 0" class="wrapper">
    <transition-group name="post-list">
      <post-item v-for="post in posts" :key="post.id" :post="post" />
    </transition-group>
  </div>
</template>

<style scoped>
.header-news {
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
}
.wrapper {
  overflow-x: hidden;
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  column-gap: 20px;
  row-gap: 25px;
}
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}
.post-list-enter,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.3s;
}
</style>
