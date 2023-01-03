<template>
  <div class="app-container d-flex flex-column">
    <Head>
      <Title>Shelf</Title>
      <!-- <Link
        v-for="(image, i) in inProgressBookImages"
        :key="i"
        rel="preload"
        fetchpriority="high"
        as="image"
        :href="image"
      /> -->
    </Head>
    <ModalWrapper />
    <HeaderBar />
    <main class="app-content">
      <NuxtPage />
    </main>
    <AddBookButton v-if="userAuth" />
  </div>
</template>

<script>
import { useBookStore } from "~~/store/BookStore";
import { useShelfStore } from "~/store/ShelfStore";
import { useUserStore } from "~/store/userStore";

export default {
  setup() {
    const bookStore = useBookStore();
    const shelfStore = useShelfStore();
    const userStore = useUserStore();
    const userAuth = useSupabaseUser();

    const inProgressBookImages = computed(() => {
      return bookStore.inProgressBooks
        .filter((book) => book?.cover)
        .map((book) => book.cover);
    });

    const fillStore = async () => {
      if (!shelfStore.shelves?.length > 0) {
        console.log("Shelf Store empty, fetching shelves");
        shelfStore.fetchShelves();
      }
    };

    watch(userAuth, () => {
      fillStore();
    });

    watch(userStore, () => {
      fillStore();
    });

    fillStore();

    return {
      inProgressBookImages,
      userAuth,
    };
  },
};
</script>

<style>
.app-content {
  min-height: calc(100vh - var(--header-height));
  max-width: var(--content-max-width);
  margin: var(--spacing-size-1);
  overflow: hidden;
}
@media (min-width: 768px) {
  .app-content {
    margin: var(--spacing-size-4);
  }
}
</style>
