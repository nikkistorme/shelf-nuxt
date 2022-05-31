<template>
  <main class="book-page backdrop-illusion d-flex jc-center">
    <div class="book-page__content w-100">
      <div class="book-page__cover-container d-flex flex-column w-100">
        <div class="book-page__cover d-flex jc-center mb-2">
          <img
            v-if="bookStore.book.cover"
            :src="bookStore.book.cover"
            :alt="bookStore.book.title"
          />
          <div
            v-else
            class="book-page__cover-placeholder d-flex flex-column jc-space-between ai-center p-1"
          >
            <h5>{{ bookStore.book.title }}</h5>
            <p>{{ bookStore.book.author }}</p>
          </div>
        </div>
      </div>
      <div class="book-page__base-info">
        <BookPageTitle :book="bookStore.book" />
        <BookPageAuthor :book="bookStore.book" />
        <BookPageTotalPages :book="bookStore.book" />
      </div>
      <!-- TODO: add/remove a book from a user's library -->
      <!-- TODO: add/remove a book from shelves -->
      <div class="book-page__cards d-flex flex-column">
        <!-- TODO: Track book progress -->
        <!-- TODO: set, view, and remove book goals -->
        <!-- TODO: Begin reading a book -->
        <!-- TODO: Show book description -->
        <!-- TODO: Show book insights -->
        <!-- TODO: Show book history -->
      </div>
    </div>
  </main>
</template>

<script>
import { useBookStore } from "~~/store/BookStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["book"],
    });

    const bookStore = useBookStore();

    return {
      bookStore,
    };
  },
};
</script>

<style>
.book-page__content {
  display: grid;
  max-width: 900px;
  padding: var(--spacing-size-3) var(--spacing-size-1);
  margin: 0 var(--spacing-size-1);
  box-shadow: var(--box-shadow-2);
  clip-path: inset(0 -15px -15px -15px);
  background: var(--color-white);
}
.book-page__cover {
  height: 250px;
  max-width: 100%;
  overflow: hidden;
}
.book-page__cover img {
  height: 100%;
  border-radius: 5px;
  object-fit: contain;
  object-position: bottom;
}
.book-page__cover-placeholder {
  height: 250px;
  width: 175px;
  border-radius: 5px;
  background-color: var(--color-grey);
  text-align: center;
}
.book-page__base-info {
  justify-self: start;
  width: fit-content;
}
.book-page__cards {
  display: grid;
  grid-gap: var(--spacing-size-2);
}
@media (min-width: 768px) {
  .book-page__content {
    grid-template-columns: 225px 1fr;
    grid-template-rows: min-content 1fr;
    grid-template-areas:
      "cover top"
      "cover cards"
      ". options"
      ". .";
    grid-gap: var(--spacing-size-2);
    padding: var(--spacing-size-3);
  }
  .book-page__cover-container {
    grid-area: cover;
    align-items: center;
  }
  .book-page__shelves {
    justify-content: start;
  }
  .book-page__cards {
    grid-area: cards;
  }
  .book-page__options {
    grid-area: options;
  }
}
</style>
