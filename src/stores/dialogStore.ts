import { reactive } from "vue";
import { defineStore } from "pinia";

import type { IDialogStoreState } from "@/interfaces";

export const useDialogStore = defineStore("dialogStore", () => {
  const state = reactive<IDialogStoreState>({
    visible: false,
    type: "",
  });

  return { state };
});
