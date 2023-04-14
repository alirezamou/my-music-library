import { createRouter, createWebHistory } from "vue-router";
import MusicIndex from "@/components/MusicIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "musicIndex",
      path: "/",
      component: MusicIndex,
    },
  ],
});

export default router;
