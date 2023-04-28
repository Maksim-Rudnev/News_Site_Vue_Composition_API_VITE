<script setup lang="ts">
import { computed, type PropType } from "vue";

import { useUserStore } from "@/stores/userStore";
import { usePostStore } from "@/stores/postStore";

import type { IPost } from "@/interfaces";

const props = defineProps({
  post: {
    type: Object as PropType<IPost>,
    required: true,
    default: () => ({}),
  },
});

const { userAvatarDefault } = useUserStore();
const { getPostImg } = usePostStore();

const postImg = getPostImg(props.post.images);

const userAvatar = computed(() =>
  props.post.user.avatar
    ? import.meta.env.VITE_VUE_APP_BASE_URL_AVATAR + props.post.user.avatar
    : userAvatarDefault,
);
</script>

<template>
  <div class="card" style="width: 18rem">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" style="background: transparent">
        {{ post.theme }}
      </li>
    </ul>
    <div v-if="post.user" class="card-body">
      <div class="topic">
        <img :src="userAvatar" class="avatar card-img-top" />
        <router-link class="card-link" :to="`/user/${post.user.id}`">
          {{ post.user.login }}
        </router-link>
      </div>
    </div>
    <img :src="postImg" class="card-img-top" style="border-radius: 0" />
    <div style="flex-grow: 1" class="card-body">
      <h5 class="card-title">
        {{ post.title }}
      </h5>
      <p class="card-text">
        {{ post.text }}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">#{{ post.tags }}</li>
    </ul>
  </div>
</template>

<style scoped>
.topic {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.avatar {
  width: 50px;
  border-radius: 25px;
  box-shadow: 0 0 0 1px lightgrey;
}
.card {
  border: solid 1px gray;
  background: transparent;
  width: 400px;
  box-shadow: 2px 2px 5px grey;
  overflow: hidden;
}

.card-body {
  flex: 0;
}

.data {
  height: 236px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
