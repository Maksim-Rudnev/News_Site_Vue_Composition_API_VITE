import { reactive } from "vue";
import { defineStore } from "pinia";
import { AxiosError } from "axios";

import api from "@/api";

import type { IAuthStoreState } from "@/interfaces";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive<IAuthStoreState>({
    user: {
      id: 0,
      login: "",
      isAuth: false,
    },
    error: null,
    responseMessage: null,
    isLoading: false,
  });

  const whoAmI = async () => {
    try {
      if (localStorage.getItem("token")) {
        state.isLoading = true;
        const { data } = await api.get("auth/whoami1");

        state.user.id = data.authUser.id;
        state.user.login = data.authUser.login;
        state.user.isAuth = true;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        state.responseMessage = error.message;
      }
    } finally {
      state.isLoading = false;
    }
  };

  const userSign = async ({ _login = "", _email = "", _password = "" }) => {
    try {
      state.error = null;
      state.isLoading = true;
      state.responseMessage = null;
      if (_login) {
        const { data } = await api.post("auth/signup", {
          login: _login,
          email: _email,
          password: _password,
        });

        state.responseMessage = data.message;
      } else {
        const { data } = await api.post("auth/signin", {
          email: _email,
          password: _password,
        });

        state.user.id = data.authUser.id;
        state.user.login = data.authUser.login;
        state.user.isAuth = true;
        localStorage.setItem("token", data.token);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        state.responseMessage = error.message;
      }
    } finally {
      state.isLoading = false;
    }
  };

  const editUser = async (formData: FormData) => {
    try {
      state.error = null;
      state.isLoading = true;
      await api.patch("users", formData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        state.responseMessage = error.message;
      }
    } finally {
      state.isLoading = false;
    }
  };

  return {
    state,
    whoAmI,
    userSign,
    editUser,
  };
});
