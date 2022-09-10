<template>
  <main class="library-page page-wrapper">
    <section class="d-flex flex-column gap-2 w-100">
      <div class="library__shelf-top d-flex gap-2">
        <ShelfTitleDropdown />
      </div>
      <!-- <p style="display: none">
        {{ pagesOnActiveShelf }} total pages on this shelf
      </p> -->
      <!-- <p style="display: none">
        {{ pagesReadTodayOnActiveShelf }} pages read today
      </p> -->
      <!-- <p style="display: none">
        {{ pagesReadThisWeekOnActiveShelf }} pages read this week
      </p> -->
      <div class="libary__books">
        <BookShelved
          v-for="(book, i) in booksOnActiveShelf"
          :key="i"
          :book="book"
          class="library__book"
          location="library"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { storeToRefs } from "pinia";
import { useShelfStore } from "~~/store/ShelfStore";
import { useBookStore } from "~~/store/BookStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth", "shelves"],
    });

    const shelfStore = useShelfStore();
    const { activeShelf } = storeToRefs(shelfStore);

    const bookStore = useBookStore();
    const booksOnActiveShelf = computed(() => {
      return bookStore.getUserBooksOnShelf(activeShelf.value);
    });

    return {
      activeShelf,
      booksOnActiveShelf,
    };
  },
};
</script>
