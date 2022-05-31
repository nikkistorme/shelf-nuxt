<template>
  <div class="app-container d-flex flex-column">
    <ModalWrapper />
    <HeaderBar v-show="userAuth" />
    <NuxtPage class="app-content" />
    <!-- <AddBookButton /> -->
  </div>
</template>

<script>
import { useBookStore } from "~/store/BookStore";
import { useShelfStore } from "~/store/ShelfStore";
import { useUserStore } from "~/store/userStore";

export default {
  setup() {
    const bookStore = useBookStore();
    const shelfStore = useShelfStore();
    const userStore = useUserStore();
    const userAuth = useSupabaseUser();

    const fillStore = async () => {
      if (!bookStore.books?.length > 0) {
        console.log("Book Store empty, fetching books");
        bookStore.fetchBooks();
      }
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
  // methods: {
  //   async test() {
  //     const ay = await $fetch("/api/user", { method: "post" });
  //     console.log("🚀 ~ ay", ay);
  //   },
  // },
};
</script>

<style>
.app-content {
  min-height: calc(100vh - var(--header-height));
}
</style>
