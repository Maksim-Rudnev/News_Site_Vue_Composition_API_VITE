<script setup lang="ts">
import { onUpdated, watch, computed } from "vue";

import { usePostStore } from "@/stores/postStore";
import { useDialogStore } from "@/stores/dialogStore";

import PostList from "@/components/PostList.vue";

const postStore = usePostStore();
const dialogStore = useDialogStore();

postStore.newsGet();

const searchQuery = computed({
  get: () => postStore.state.searchQuery,
  set: (value) => (postStore.state.searchQuery = value),
});

const selectedSort = computed({
  get: () => postStore.state.selectedSort,
  set: (value) => (postStore.state.selectedSort = value),
});

watch(
  () => postStore.state.error,
  () => {
    if (postStore.state.error) {
      dialogStore.state.visible = true;
      dialogStore.state.type = "ERROR";
    }
  },
);

onUpdated(() => {
  if (!postStore.state.page || postStore.state.page > postStore.pageCount) {
    postStore.state.page = postStore.pageCount;
  }
});
</script>

<template>
  <div>
    <div class="search-select">
      <my-input
        v-model="searchQuery"
        style="height: 39px"
        placeholder="Поиск..."
      />
      <my-select
        v-model="selectedSort"
        :options="postStore.state.sortOptions"
      />
    </div>
    <post-list
      v-if="!postStore.state.isLoading"
      :posts="postStore.slicePosts"
    />
    <my-spin v-else />

    <div class="page__wrapper">
      <div
        v-for="pageNumber in postStore.pageCount"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': postStore.state.page === pageNumber,
        }"
        @click="postStore.state.page = pageNumber"
      >
        <my-button style="text-decoration: none">
          {{ pageNumber }}
        </my-button>
      </div>
    </div>
  </div>
</template>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
}

.current-page {
  border: 1px solid black;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-select {
  display: flex;
  align-items: center;
  margin: 15px 0;
  column-gap: 20px;
}
</style>
