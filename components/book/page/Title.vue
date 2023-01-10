<template>
  <h1 class="book-page__title">{{ userBook.title }}</h1>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBookStore } from "~/store/BookStore";

export default {
  setup() {
    const bookStore = useBookStore();
    const { userBook } = storeToRefs(bookStore);

    return {
      userBook,
    };
  },
};
</script>

<style>
.book-page__title {
  text-align: center;
  font-size: var(--font-size-2);
}

@media (min-width: 768px) {
  .book-page__title {
    text-align: left;
  }
}
</style>
