<script setup lang="ts">
import { onUnmounted, ref } from "vue";

import { useAuthStore } from "@/stores/authStore";
import { useDialogStore } from "@/stores/dialogStore";
import { useUserStore } from "@/stores/userStore";

const authStore = useAuthStore();
const dialogStore = useDialogStore();
const userStore = useUserStore();

const errorsValid = ref<string[]>([]);
const login = ref("");
const email = ref("");
const password = ref("");
const submitValue = ref(
  (() => {
    if (dialogStore.state.type === "SIGNUP") {
      return "Зарегистрироваться";
    } else if (dialogStore.state.type === "SIGNIN") {
      return "Войти";
    }
    return "Отредактировать";
  })(),
);

const checkForm = async (event: Event) => {
  event.preventDefault();
  errorsValid.value = [];
  const img = new FormData(event.target as HTMLFormElement).get("img");

  if (dialogStore.state.type !== "EDIT_PROFILE") {
    if (!email.value) {
      errorsValid.value.push("Email обязательный.");
    }
    if (!validEmail(email.value)) {
      errorsValid.value.push("Требуется корректный email.");
    }
    if (!password.value) {
      errorsValid.value.push("Пароль обязательный.");
    }
    if (password.value.length < 4) {
      errorsValid.value.push("Пароль не меньше 4 символов.");
    }
  }

  if (dialogStore.state.type === "SIGNUP") {
    if (!login.value) {
      errorsValid.value.push("Логин обязательный.");
    }
    if (login.value.length < 4 || login.value.length > 15) {
      errorsValid.value.push("Логин не меньше 4 символов и не больше 30.");
    }
  }

  if (dialogStore.state.type === "EDIT_PROFILE" && login.value) {
    if (login.value.length < 4 || login.value.length > 15) {
      errorsValid.value.push("Логин не меньше 4 символов и не больше 30.");
    }
  }

  if (!errorsValid.value.length) {
    if (dialogStore.state.type === "SIGNUP") {
      await authStore.userSign({
        _login: login.value,
        _email: email.value,
        _password: password.value,
      });
    }
    if (dialogStore.state.type === "SIGNIN") {
      await authStore.userSign({
        _email: email.value,
        _password: password.value,
      });
      if (authStore.state.user.isAuth) dialogStore.state.visible = false;
    }
    if (dialogStore.state.type === "EDIT_PROFILE") {
      if (login.value || img) {
        const formData = new FormData();
        formData.append("login", login.value);
        formData.append("file", String(img));
        await authStore.editUser(formData);
        if (!authStore.state.error) {
          if (login.value) {
            userStore.state.login = login.value;
            authStore.state.user.login = login.value;
          }
          userStore.getUserById(userStore.state.id);
          dialogStore.state.visible = false;
        }
      }
    }
  }
};

const validEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

onUnmounted(() => {
  authStore.state.responseMessage = null;
});
</script>

<template>
  <div style="padding-left: 12px">
    <h2 v-if="dialogStore.state.type === 'SIGNUP'">Регистрация</h2>
    <h2 v-if="dialogStore.state.type === 'SIGNIN'">Вход</h2>
    <div v-if="dialogStore.state.type === 'EDIT_PROFILE'">
      <h2>Редактрование</h2>
      <p>Заполните поля, которые хотите изменить</p>
    </div>
  </div>
  <form id="app" novalidate="true" @submit="checkForm">
    <div v-if="errorsValid.length">
      <b>Пожалуйста исправьте следующие ошибки:</b>
      <ul>
        <li v-for="error in errorsValid" :key="error">
          {{ error }}
        </li>
      </ul>
    </div>
    <div v-if="dialogStore.state.type !== 'SIGNIN'" class="form-floating mb-3">
      <input
        id="login"
        v-model="login"
        type="text"
        class="form-control"
        placeholder="name"
      />
      <label for="login">Введите логин</label>
    </div>
    <div
      v-if="dialogStore.state.type !== 'EDIT_PROFILE'"
      class="form-floating mb-3"
    >
      <input
        id="email"
        v-model="email"
        type="email"
        class="form-control"
        placeholder="name@example.com"
      />
      <label for="email">Введите email</label>
    </div>
    <div
      v-if="dialogStore.state.type !== 'EDIT_PROFILE'"
      class="form-floating mb-3"
    >
      <input
        id="password"
        v-model="password"
        type="password"
        class="form-control"
        placeholder="password"
      />
      <label for="password">Введите пароль</label>
    </div>
    <div
      v-if="dialogStore.state.type === 'EDIT_PROFILE'"
      class="form-floating mb-3"
    >
      <input
        type="file"
        name="img"
        class="form-control"
        placeholder="password"
      />
    </div>
    <p style="display: flex; justify-content: center">
      <my-button type="submit">
        {{ submitValue }}
      </my-button>
    </p>
    <p
      v-if="authStore.state.responseMessage"
      style="display: flex; justify-content: center"
    >
      {{ authStore.state.responseMessage }}
    </p>
  </form>
</template>
