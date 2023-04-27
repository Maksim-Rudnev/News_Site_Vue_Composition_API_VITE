import { createRouter, createWebHistory } from "vue-router";

import PostPage from "@/views/PostPage.vue";
import UserPage from "@/views/UserPage.vue";

const routes = [
  {
    path: "/news",
    component: PostPage,
  },
  {
    path: "/user/:id",
    component: UserPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
