<script setup lang="ts">
import { onBeforeMount, computed } from "vue";

import { useDialogStore } from "@/stores/dialogStore";
import { useAuthStore } from "@/stores/authStore";
import { usePostStore } from "@/stores/postStore";
import { useUserStore } from "@/stores/userStore";

import UserForm from "@/components/UserForm.vue";

import { useVModel } from "@/hooks";

const dialogStore = useDialogStore();
const authStore = useAuthStore();
const postStore = usePostStore();
const userStore = useUserStore();

const show = useVModel(dialogStore.state, "visible");
const dialogType = useVModel(dialogStore.state, "type");

const getError = computed(() => {
  if (authStore.state.responseMessage) return authStore.state.responseMessage;
  if (postStore.state.error) return postStore.state.error;
  if (userStore.state.error) return userStore.state.error;

  return null;
});

const signOut = () => {
  authStore.state.user.id = 0;
  authStore.state.user.isAuth = false;
  authStore.state.user.login = "";
  localStorage.removeItem("token");
};

onBeforeMount(() => {
  authStore.whoAmI();
});
</script>

<template>
  <div class="navbar">
    <my-button @click="$router.push('/news')">Новости</my-button>
    <div class="right-panel">
      <my-button
        v-if="!authStore.state.user.isAuth"
        @click="(show = true), (dialogType = 'SIGNUP')"
      >
        Регистрация
      </my-button>
      <my-button
        v-else
        id="login-user"
        @click="$router.push(`/user/${authStore.state.user.id}`)"
      >
        {{ authStore.state.user.login }}
      </my-button>
      <my-button
        v-if="!authStore.state.user.isAuth"
        @click="(show = true), (dialogType = 'SIGNIN')"
      >
        Войти
      </my-button>
      <my-button v-else @click="signOut"> Выйти </my-button>
    </div>
  </div>
  <my-dialog
    v-if="dialogType === 'SIGNUP' || dialogType === 'SIGNIN'"
    v-model:show="show"
  >
    <user-form />
  </my-dialog>
  <my-dialog v-if="dialogType === 'ERROR'" v-model:show="show">
    <h1 style="color: brown">
      {{ getError }}
    </h1>
  </my-dialog>
</template>

<style scoped>
.navbar {
  border: solid 1px gray;
  border-radius: 5px;
  z-index: 1;
  flex-wrap: nowrap;
  height: 55px;
  background-color: transparent;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
}
.right-panel {
  display: flex;
  column-gap: 15px;
}
#login-user {
  font-weight: bold;
  border: 0px;
  font-size: 20px;
  align-self: center;
}
</style>
