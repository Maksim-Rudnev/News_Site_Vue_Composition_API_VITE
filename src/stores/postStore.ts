import { reactive, computed } from "vue";
import { defineStore } from "pinia";

import api from "@/api";

import type { IPostStoreState } from "@/interfaces";

export const usePostStore = defineStore("postStore", () => {
  const state = reactive<IPostStoreState>({
    limit: 8,
    posts: [],
    page: 1,
    isLoading: false,
    error: null,
    searchQuery: "",
    selectedSort: "title",
    sortOptions: [
      {
        value: "title",
        name: "По названию",
      },
      {
        value: "text",
        name: "По описанию",
      },
      {
        value: "tags",
        name: "По тегам",
      },
      {
        value: "theme",
        name: "По темам",
      },
      {
        value: "user.login",
        name: "По авторам",
      },
    ],
  });

  const sortedPosts = computed(() => {
    return [...state.posts].sort((post1, post2) =>
      String(post1[state.selectedSort] ?? post1.user.login)?.localeCompare(
        String(post2[state.selectedSort] ?? post2.user.login),
      ),
    );
  });

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      String(post[state.selectedSort] ?? post.user.login)
        .toLowerCase()
        .includes(state.searchQuery.toLowerCase()),
    );
  });

  const slicePosts = computed(() => {
    return sortedAndSearchedPosts.value.slice(
      (state.page - 1) * state.limit,
      state.page * state.limit,
    );
  });

  const pageCount = computed(() => {
    return Math.ceil(sortedAndSearchedPosts.value.length / state.limit);
  });

  const getPostImg = (img: string) => {
    return import.meta.env.VITE_VUE_APP_BASE_URL_IMAGE + img;
  };

  const newsGet = async () => {
    state.error = null;
    state.isLoading = true;
    try {
      const { data } = await api.get("news");

      state.posts = data;
    } catch (err) {
      state.error = err;
    } finally {
      state.isLoading = false;
    }
  };

  const newsAdd = async (formData: FormData) => {
    state.error = null;
    console.log(formData);
    state.isLoading = true;
    try {
      await api.post("news", formData);
    } catch (err) {
      state.error = err;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    state,
    sortedPosts,
    sortedAndSearchedPosts,
    slicePosts,
    pageCount,
    newsGet,
    newsAdd,
    getPostImg,
  };
});
