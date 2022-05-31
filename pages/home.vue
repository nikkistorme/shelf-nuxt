<script>
import { useShelfStore } from "~~/store/ShelfStore";
import { useUserStore } from "~~/store/userStore";

export default {
  setup() {
    definePageMeta({
      middleware: "auth",
    });

    const userStore = useUserStore();
    const shelfStore = useShelfStore();

    return {
      userStore,
      shelfStore,
    };
  },
};
</script>

<template>
  <main
    v-if="userStore?.profile?.id"
    class="home-page page-wrapper d-grid ji-center as-center"
  >
    <HomeShelf v-if="shelfStore.inProgressShelf" />
    <!-- <HomeGoalStats /> -->
    <!-- <HomePredictionStats /> -->
  </main>
</template>

<style>
.home-page {
  grid-gap: var(--spacing-size-2);
}
.home-page__list-item {
  position: relative;
}
@media (min-width: 768px) {
  .home-page {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: min-content;
  }
}
@media (min-width: 1350px) {
  .home-page {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "shelf shelf goals goals"
      ". . prediction prediction";
  }
  .home-shelf {
    grid-area: shelf;
  }
  .home-goals {
    grid-area: goals;
  }
  .home-predictions {
    grid-area: prediction;
  }
  .home-social {
    grid-area: social;
  }
}
</style>
