<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";

import MyNavbar from "@/components/MyNavbar.vue";

const router = useRouter();

router.push("/news");
</script>

<template>
  <div class="background">
    <my-navbar />
    <div class="app">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  padding: 20px;
  background-image: url(@/../images/background.png);
  background-size: contain;
  min-height: 100vh;
  z-index: 0;
  position: relative;
}

.app {
  z-index: 1;
}

.app::after {
  content: "";
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    81.97deg,
    rgba(255, 255, 255, 0.94) 25.25%,
    rgba(255, 255, 255, 0.79) 85.98%,
    rgba(255, 255, 255, 0.88) 99.02%
  );
  opacity: 0.6;
}
</style>
