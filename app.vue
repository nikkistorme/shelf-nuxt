<template>
  <div class="app-container d-flex flex-column">
    <Head>
      <Title>Shelf</Title>
      <Link rel="preconnect" href="https://fonts.gstatic.com" />
      <Meta
        name="description"
        content="Shelf is a book tracking app that provides a more joyful online user experience. Shelf not only provides insight and data into users reading habits, but it also turns the private experience of reading into a community-based activity that is beautiful, delightful, and shareable."
      />
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
import { useShelfStore } from "~/store/ShelfStore";
import { useUserStore } from "~/store/UserStore";

export default {
  setup() {
    const shelfStore = useShelfStore();
    const userStore = useUserStore();
    const userAuth = useSupabaseUser();

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
