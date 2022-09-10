<template>
  <main class="book-page d-flex jc-center">
    <div class="book-page__content w-100">
      <BookPageEditInfo
        v-if="userAuth && userBook?.id"
        class="book-page__edit-icon"
      />
      <div class="book-page__cover-container d-flex flex-column w-100">
        <div class="book-page__cover d-flex jc-center mb-2">
          <img
            v-if="userBook.cover"
            :src="userBook.cover"
            :alt="userBook.title"
          />
          <div
            v-else
            class="book-page__cover-placeholder d-flex flex-column jc-space-between ai-center p-1"
          >
            <h5>{{ userBook.title }}</h5>
            <p>{{ userBook.author }}</p>
          </div>
        </div>
        <ButtonDefault
          v-if="userAuth && !userBook?.id"
          @click="addBookToLibrary"
        >
          Add to library
        </ButtonDefault>
        <ButtonDefault
          v-if="userAuth && userBook?.id && !userBook.in_progress"
          @click="startReadingBook"
        >
          Start reading
        </ButtonDefault>
        <ButtonInline
          v-if="userAuth && userBook?.id"
          text="Remove from library"
          color="red"
          underline
          @click="removeBookFromLibrary"
        />
      </div>
      <div class="book-page__base-info d-flex flex-column gap-1">
        <BookPageTitle :book="book" />
        <BookPageAuthor :book="book" />
        <div class="d-flex ai-baseline gap-half">
          <BookPageTotalPages :book="userBook" />
          <span>|</span>
          <BookPagePublishing v-if="book.publisher" :book="book" />
        </div>
      </div>
      <!-- TODO: add/remove a book from shelves -->
      <div class="book-page__cards d-flex flex-column">
        <div class="book-page__in-progress-info">
          <BookPageProgress
            v-if="userAuth && userBook?.id && userBook.in_progress"
            :book="userBook"
          />
          <BookPageGoal
            v-if="userAuth && userBook?.id && userBook.in_progress"
            :book="userBook"
            class="py-1"
          />
        </div>
        <BookPageDescription :book="book" />
        <!-- TODO: Show book insights -->
        <!-- TODO: Show book history -->
      </div>
    </div>
  </main>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBookStore } from "~~/store/BookStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth", "book"],
    });
    const userAuth = useSupabaseUser();

    const bookStore = useBookStore();
    const { book, userBook } = storeToRefs(bookStore);

    async function addBookToLibrary() {
      await bookStore.addBookToLibrary();
    }

    async function startReadingBook() {
      await bookStore.startReadingBook(userBook.value);
    }

    async function removeBookFromLibrary() {
      await bookStore.removeBookFromLibrary();
    }

    return {
      userAuth,
      book,
      userBook,
      addBookToLibrary,
      startReadingBook,
      removeBookFromLibrary,
    };
  },
};
</script>

<style>
.book-page__content {
  position: relative;
  display: grid;
  gap: var(--spacing-size-2);
  max-width: 900px;
  height: min-content;
  padding: var(--spacing-size-3) var(--spacing-size-1);
  margin: var(--spacing-size-1);
  background: var(--color-white);
}
.book-page__edit-icon {
  position: absolute;
  top: var(--spacing-size-1);
  right: var(--spacing-size-1);
}
.book-page__cover {
  height: 350px;
  max-width: 100%;
  /* overflow: hidden; */
}
.book-page__cover img {
  height: 100%;
  border-radius: 5px;
  object-fit: contain;
  object-position: bottom;
  box-shadow: var(--box-shadow-2);
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
  grid-auto-rows: min-content;
}
.book-page__in-progress-info {
  max-width: 400px;
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
  .book-page__cards {
    grid-area: cards;
  }
  .book-page__options {
    grid-area: options;
  }
}
</style>
