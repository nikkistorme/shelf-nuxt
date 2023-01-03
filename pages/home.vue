<template>
  <div
    v-if="profile?.id && getSortedShelves && inProgressShelf"
    class="home-page d-grid"
  >
    <div class="d-flex flex-column gap-2">
      <h2>Continue reading</h2>
      <HomeShelf v-if="inProgressShelf" />
    </div>
    <div class="d-flex flex-column gap-2">
      <h2>Jump to a shelf</h2>
      <div class="d-flex flex-wrap gap-half">
        <div
          v-for="(shelf, i) in getSortedShelves"
          :key="i"
          class="d-flex gap-half"
        >
          <span v-if="i > 0">|</span>
          <NuxtLink :to="`shelves/${shelf.id}`">
            {{ `${shelf.name} (${shelf.book_count})` }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- <HomeGoalStats /> -->
    <!-- <HomePredictionStats /> -->
  </div>
</template>

<script>
import { useShelfStore } from "~~/store/ShelfStore";
import { useUserStore } from "~~/store/userStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    definePageMeta({
      middleware: ["user-auth", "home"],
    });

    const userStore = useUserStore();
    const { profile } = storeToRefs(userStore);

    const shelfStore = useShelfStore();
    const { inProgressShelf, getSortedShelves } = storeToRefs(shelfStore);

    onMounted(() => {
      if (!inProgressShelf.value) shelfStore.fetchShelves();
    });

    return {
      profile,
      inProgressShelf,
      getSortedShelves,
    };
  },
};
</script>

<style>
.home-page {
  grid-gap: var(--spacing-size-3);
}
.home-page__list-item {
  position: relative;
}
@media (min-width: 768px) {
  .home-page {
    grid-template-columns: 1fr auto;
  }
}
/* @media (min-width: 768px) {
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
} */
</style>
