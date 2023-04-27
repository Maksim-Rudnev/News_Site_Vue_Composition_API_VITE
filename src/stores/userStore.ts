import { reactive } from "vue";
import { defineStore } from "pinia";

import api from "@/api";

import type { IUserStoreState } from "@/interfaces";

export const useUserStore = defineStore("userStore", () => {
  const userAvatarDefault = "/images/avatarDefault.png";

  const state = reactive<IUserStoreState>({
    id: 0,
    avatar: "",
    email: "",
    login: "",
    news: [],
    isLoading: false,
    error: null as unknown,
  });

  const getUserById = async (userId: number) => {
    try {
      state.error = null;
      state.isLoading = true;
      const { data } = await api.get(`users/${userId}`);
      const { user } = data;

      state.id = user.id;
      state.avatar = user.avatar;
      state.email = user.email;
      state.login = user.login;
      state.news = user.news;
    } catch (err: unknown) {
      state.error = err;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    state,
    userAvatarDefault,
    getUserById,
  };
});

// Below are examples of alternative writing of the store

// export const useUserStore1 = defineStore('userStore1', () => {
//   const userAvatarDefault = '/images/avatarDefault.png';

//   const id = ref(0);
//   const avatar = ref(null);
//   const email = ref('');
//   const login = ref('');
//   const news = ref([]);
//   const isLoading = ref(false);
//   const error = ref(null as unknown);

//   const getUserById = async (userId: number) => {
//     try {
//       error.value = null;
//       isLoading.value = true;
//       const { data } = await api.get(`users/${userId}`);
//       const { user } = data;
//       id.value = user.id;
//       avatar.value = user.avatar;
//       email.value = user.email;
//       login.value = user.login;
//       news.value = user.news;
//     } catch (err: unknown) {
//       error.value = err;
//     } finally {
//       isLoading.value = false;
//     }
//   };
//   return { id, avatar, email, login, news, isLoading, error, userAvatarDefault, getUserById };
// });

// export const useUserStore3 = defineStore({
//   id: 'userStore3',
//   state: () => ({
//     id: 0,
//     avatar: null,
//     email: '',
//     login: '',
//     news: [],
//     isLoading: false,
//     error: null as unknown
//   }),
//   actions: {
//     async getUserById(userId: number) {
//       try {
//         this.error = null;
//         this.isLoading = true;
//         const { data } = await api.get(`users/${userId}`);
//         const { user } = data;
//         this.id = user.id;
//         this.avatar = user.avatar;
//         this.email = user.email;
//         this.login = user.login;
//         this.news = user.news;
//       } catch (err: unknown) {
//         this.error = err;
//       } finally {
//         this.isLoading = false;
//       }
//     }
//   },
//   getters: {
//     userAvatarDefault: () => '/images/avatarDefault.png'
//   }
// });
