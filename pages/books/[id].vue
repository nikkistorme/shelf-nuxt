<template>
  <div class="book-page d-flex jc-center">
    <Title v-if="book?.title">{{ book.title }}</Title>

    <div class="book-page__content w-100">
      <div class="d-flex flex-column gap-half">
        <BookPageCover />
        <BookPageActions />
      </div>

      <div class="book-page__base-info d-flex flex-column gap-half w-100">
        <BookPageTitle v-if="book?.title" />
        <BookPageAuthor v-if="book?.author" :book="book" />
        <div class="d-flex jc-center ai-baseline gap-half">
          <BookPageTotalPages v-if="book?.total_pages" />
          <BookPagePublishing v-if="book?.publisher" :book="book" />
        </div>
      </div>

      <div class="book-page__user gap-1" v-if="userAuth">
        <BookPageStatus v-if="userBook?.id" />
        <BookPageShelves v-if="userBook && shelves?.length" />
        <div
          class="book-page__in-progress-info d-flex flex-wrap"
          v-if="userBook?.status === 'in_progress'"
        >
          <BookPageProgress :book="userBook" />
          <BookPageGoal :book="userBook" class="py-1" />
        </div>
        <!-- TODO: Show book insights -->
        <!-- TODO: Show book history -->
      </div>

      <BookPageDescription v-if="book?.description" :book="book" />

      <ButtonInline
        v-if="userAuth && userBook?.id"
        text="Remove from library"
        color="red"
        underline
        @click="removeBookFromLibrary"
      />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBookStore } from "~/store/BookStore";
import { useShelfStore } from "~/store/ShelfStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["user-auth", "book"],
    });
    const userAuth = useSupabaseUser();

    const bookStore = useBookStore();
    const { book, userBook } = storeToRefs(bookStore);

    async function removeBookFromLibrary() {
      await bookStore.removeBookFromLibrary();
    }

    const shelfStore = useShelfStore();
    const { shelves } = storeToRefs(shelfStore);

    return {
      userAuth,
      book,
      userBook,
      removeBookFromLibrary,
      shelves,
    };
  },
};
</script>

<style>
.book-page__content {
  position: relative;
  display: grid;
  gap: var(--spacing-size-1);
  height: min-content;
  background: var(--color-white);
}
.book-page__base-info {
  justify-self: start;
  /* width: fit-content; */
}
.book-page__user {
  display: grid;
  grid-auto-rows: min-content;
  padding: var(--spacing-size-1);
  border: var(--border-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
}
.book-page__in-progress-info {
  column-gap: var(--spacing-size-3);
}
@media (min-width: 768px) {
  .book-page__content {
    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;
    grid-template-areas:
      "cover top"
      "cover cards"
      ". options"
      ". .";
    grid-gap: var(--spacing-size-3);
    padding: var(--spacing-size-3);
  }
  .book-page__cover-container {
    grid-area: cover;
    align-items: start;
  }
  .book-page__shelves {
    justify-content: start;
  }
  .book-page__user {
    grid-area: cards;
  }
  .book-page__options {
    grid-area: options;
  }
}
</style>
