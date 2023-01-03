<template>
  <div class="book-page d-flex jc-center">
    <Title>{{ userBook ? userBook.title : book.title }}</Title>
    <div class="book-page__content w-100">
      <BookPageEditInfo
        v-if="userAuth && userBook?.id"
        class="book-page__edit-icon"
      />
      <div class="book-page__cover-container d-flex flex-column w-100">
        <div class="book-page__cover d-flex jc-center mb-2">
          <img v-if="coverImage" :src="coverImage" :alt="coverAltText" />
          <div
            v-else
            class="book-page__cover-placeholder d-flex flex-column jc-between ai-center p-1"
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
          <BookPageTotalPages :book="userBook?.id ? userBook : book" />
          <span>|</span>
          <BookPagePublishing v-if="book.publisher" :book="book" />
        </div>
      </div>
      <div class="book-page__cards d-flex flex-column">
        <BookPageShelves v-if="userBook && shelves?.length" />
        <div class="book-page__in-progress-info d-flex flex-wrap">
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
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBookStore } from "~~/store/BookStore";
import { useShelfStore } from "~~/store/ShelfStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["user-auth", "book"],
    });
    const userAuth = useSupabaseUser();

    const bookStore = useBookStore();
    const { book, userBook } = storeToRefs(bookStore);

    const coverImage = computed(() => {
      if (userBook?.value?.cover) return userBook.value.cover;
      if (book?.value?.cover) return book.value.cover;
      return null;
    });

    const coverAltText = computed(() => {
      if (userBook?.value?.title) return userBook.value.title;
      if (book?.value?.title) return book.value.title;
      return "";
    });

    async function addBookToLibrary() {
      await bookStore.addBookToLibrary();
    }

    async function startReadingBook() {
      await bookStore.startReadingBook(userBook.value);
    }

    async function removeBookFromLibrary() {
      await bookStore.removeBookFromLibrary();
    }

    const shelfStore = useShelfStore();
    const { shelves } = storeToRefs(shelfStore);

    return {
      userAuth,
      book,
      userBook,
      coverImage,
      coverAltText,
      addBookToLibrary,
      startReadingBook,
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
  gap: var(--spacing-size-2);
  height: min-content;
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
  .book-page__cards {
    grid-area: cards;
  }
  .book-page__options {
    grid-area: options;
  }
}
</style>
