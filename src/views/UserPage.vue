<script setup lang="ts">
import { onUpdated, watch, computed, ref } from "vue";
import { useRoute } from "vue-router";

import { useDialogStore } from "@/stores/dialogStore";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";

import UserForm from "@/components/UserForm.vue";
import PostList from "@/components/PostList.vue";
import AddNews from "@/components/AddNews.vue";

import { useVModel } from "@/hooks";

const userStore = useUserStore();
const dialogStore = useDialogStore();
const authStore = useAuthStore();

const id = ref(Number(useRoute().params.id));
const isMyProfile = computed(() => authStore.state.user.id === id.value);

const show = useVModel(dialogStore.state, "visible");

userStore.getUserById(id.value);
const userAvatar = computed(() =>
  userStore.state.avatar
    ? import.meta.env.VITE_VUE_APP_BASE_URL_AVATAR + userStore.state.avatar
    : userStore.userAvatarDefault,
);

onUpdated(() => {
  if (id.value !== Number(useRoute().params.id)) {
    id.value = Number(useRoute().params.id);
  }
});

watch(
  () => userStore.state.error,
  () => {
    if (userStore.state.error) {
      dialogStore.state.visible = true;
      dialogStore.state.type = "ERROR";
    }
  },
);
</script>

<template>
  <hr />
  <div v-if="!userStore.state.isLoading">
    <div>
      <div class="data-user">
        <img :src="userAvatar" class="avatar" alt="..." />
        <div class="data-text">
          <strong>Логин</strong>
          <p>
            {{ userStore.state.login }}
          </p>
          <strong>Почта</strong>
          <p>
            {{ userStore.state.email }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="isMyProfile" class="wrapper-button">
      <my-button
        @click="
          (dialogStore.state.visible = true),
            (dialogStore.state.type = 'ADD_NEWS')
        "
      >
        Добавить новость
      </my-button>
      <my-button
        @click="
          (dialogStore.state.visible = true),
            (dialogStore.state.type = 'EDIT_PROFILE')
        "
      >
        Редактировать профиль
      </my-button>
    </div>
    <my-dialog v-if="dialogStore.state.type === 'ADD_NEWS'" v-model:show="show">
      <add-news />
    </my-dialog>

    <my-dialog
      v-if="dialogStore.state.type === 'EDIT_PROFILE'"
      v-model:show="show"
    >
      <user-form />
    </my-dialog>
    <hr />
    <post-list :posts="userStore.state.news" />
  </div>
  <my-spin v-else />
</template>

<style>
.wrapper-button {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}
.data-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.data-user {
  display: flex;
  justify-content: center;
  gap: 45px;
}
.avatar {
  width: 150px;
  border-radius: 75px;
  box-shadow: 0 0 0 1px lightgrey;
}
</style>
