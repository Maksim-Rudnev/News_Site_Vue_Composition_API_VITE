<script setup lang="ts">
import { ref } from "vue";

import { usePostStore } from "@/stores/postStore";
import { useDialogStore } from "@/stores/dialogStore";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";

const postStore = usePostStore();
const dialogStore = useDialogStore();
const userStore = useUserStore();
const authStore = useAuthStore();

const errorsValid = ref<string[]>([]);
const theme = ref("");
const title = ref("");
const text = ref("");
const tags = ref("");
const img = ref();

const checkForm = async (event: Event) => {
  event.preventDefault();
  img.value = new FormData(event.target as HTMLFormElement).get("img");
  errorsValid.value = [];
  if (!theme.value) {
    errorsValid.value.push("Тема обязательна.");
  }

  if (theme.value.length < 5 || theme.value.length > 30) {
    errorsValid.value.push("Тема должна быть длиннее 5 и короче 30.");
  }

  if (!title.value) {
    errorsValid.value.push("Заголовок обязательный.");
  }

  if (title.value.length < 5 || title.value.length > 30) {
    errorsValid.value.push("Заголовок должен быть длиннее 5 и короче 30.");
  }

  if (!text.value) {
    errorsValid.value.push("Описание обязательно.");
  }

  if (text.value.length < 5 || text.value.length > 150) {
    errorsValid.value.push("Текст должен быть длиннее 5 и короче 150.");
  }

  if (!tags.value) {
    errorsValid.value.push("Тег обязательный.");
  }

  if (!img.value.size) {
    errorsValid.value.push("Выберите фото.");
  }

  if (!errorsValid.value.length) {
    const formData = new FormData();

    formData.append("theme", theme.value);
    formData.append("title", title.value);
    formData.append("text", text.value);
    formData.append("tags", tags.value);
    formData.append("file", img.value);
    await postStore.newsAdd(formData);
    if (!postStore.state.error) {
      dialogStore.state.visible = false;
      userStore.getUserById(authStore.state.user.id);
    }
  }
};
</script>

<template>
  <h2 style="padding-left: 12px">Добавление новости</h2>
  <form id="app" novalidate="true" @submit="checkForm">
    <div v-if="errorsValid.length">
      <b>Пожалуйста исправьте следующие ошибки:</b>
      <ul>
        <li v-for="error in errorsValid" :key="error">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="form-floating mb-3">
      <input
        id="theme"
        v-model="theme"
        type="text"
        class="form-control"
        placeholder="theme"
      />
      <label for="theme">Введите тему</label>
    </div>

    <div class="form-floating mb-3">
      <input
        id="title"
        v-model="title"
        type="text"
        class="form-control"
        placeholder="title"
      />
      <label for="title">Введите заголовок</label>
    </div>

    <div class="form-floating mb-3">
      <input
        id="tags"
        v-model="tags"
        type="text"
        class="form-control"
        placeholder="tags"
      />
      <label for="tags">Введите тег</label>
    </div>

    <div class="form-floating mb-3">
      <p style="padding-left: 13px; margin-bottom: 5px">
        Введите описание новости
      </p>
      <textarea
        id="text"
        v-model="text"
        style="padding-top: 10px; height: 172px; max-height: 450px"
        type="text"
        class="form-control"
        placeholder="text"
        name=""
        cols="30"
        rows="10"
      />
    </div>

    <div class="form-floating mb-3">
      <input
        style="padding-right: 0px; padding-top: 19px"
        type="file"
        class="form-control"
        name="img"
      />
    </div>

    <p style="display: flex; justify-content: center">
      <my-button type="submit"> Добавить </my-button>
    </p>
    <p
      v-if="postStore.state.error"
      style="display: flex; justify-content: center"
    >
      {{ postStore.state.error }}
    </p>
  </form>
</template>
