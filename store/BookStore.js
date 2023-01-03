import { defineStore } from "pinia";
import { useShelfStore } from "./ShelfStore";

import {
  addNewBook,
  addBookToLibrary,
  fetchUserBooks,
  fetchInProgressBooks,
  fetchBook,
  startReadingBook,
  updateProgress,
  updateUserBook,
  removeBookFromLibrary,
} from "~/services/bookService";

import {
  getInProgressShelfCount,
  updateInProgressShelfCount,
} from "~/services/shelfService";

export const useBookStore = defineStore("BookStore", {
  state: () => ({
    userBooks: [],
    book: null,
    userBook: {},
    loading: false,
    bookToAdd: null,
  }),
  getters: {
    inProgressBooks() {
      return this.userBooks.filter((book) => book.in_progress);
    },
    getBookById(id) {
      return this.userBooks.find((book) => book.id === id);
    },
    getUserBooksOnShelf() {
      return (shelf) => {
        if (!this.userBooks?.length > 0) return [];
        if (shelf?.all_books_shelf) {
          return this.userBooks;
        } else if (shelf?.finished_shelf) {
          return this.userBooks.filter((book) => book.finished);
        } else if (shelf?.in_progress_shelf) {
          return this.userBooks.filter((book) => book.in_progress);
        } else if (shelf?.unread_shelf) {
          return this.userBooks.filter(
            (book) => !book.finished && !book.in_progress
          );
        } else {
          return this.userBooks.filter((book) =>
            book.shelves?.includes(shelf.id)
          );
        }
      };
    },
  },
  actions: {
    async addNewBook() {
      this.loading = true;
      let newBook;
      try {
        newBook = await addNewBook(this.bookToAdd);
        await this.addBookToLibrary(newBook);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.book = newBook;
      this.loading = false;
    },
    async addBookToLibrary(book = null) {
      this.loading = true;
      if (!book?.id) {
        book = this.book;
      }
      let userBook;
      try {
        userBook = await addBookToLibrary(book);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.userBook = userBook;
      this.userBooks.push(userBook);
      this.loading = false;
    },
    async fetchUserBooks() {
      this.loading = true;
      try {
        const books = await fetchUserBooks();
        this.userBooks = books;
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
    },
    async fetchInProgressBooks() {
      this.loading = true;
      let books;
      try {
        books = await fetchInProgressBooks();
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.userBooks = books;
      this.loading = false;
    },
    async fetchBook(book_id) {
      this.loading = true;
      try {
        const { book, userBook } = await fetchBook(book_id);
        this.book = book;
        if (userBook?.base === book.id) this.userBook = userBook;
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
    },
    async startReadingBook(user_book) {
      this.loading = true;
      let updatedBook;
      try {
        updatedBook = await startReadingBook(user_book);
        const inProgressShelfCount = await getInProgressShelfCount();
        const inProgressShelf = await updateInProgressShelfCount(
          inProgressShelfCount
        );
        const shelfStore = useShelfStore();
        shelfStore.shelves.filter((shelf) => shelf.id !== inProgressShelf.id);
        shelfStore.shelves.push(inProgressShelf);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      if (updatedBook?.id) {
        this.userBook = updatedBook;
        this.userBooks.filter((book) => book.id !== updatedBook.id);
        this.userBooks.push(updatedBook);
      }
      this.loading = false;
    },
    async updateProgress(user_book_id, book_updates) {
      this.loading = true;
      let updatedBook;
      try {
        updatedBook = await updateProgress(user_book_id, book_updates);
      } catch (error) {
        throw error;
      }
      if (updatedBook?.id) this.userBook = updatedBook;
      this.loading = false;
    },
    async setGoal(user_book_id, book_updates) {
      this.loading = true;
      let updatedBook;
      try {
        updatedBook = await updateUserBook(user_book_id, book_updates);
      } catch (error) {
        throw error;
      }
      if (updatedBook?.id) this.userBook = updatedBook;
      this.loading = false;
    },
    async finishReadingBook(user_book_id, book_updates) {
      this.loading = true;
      let updatedBook;
      try {
        updatedBook = await updateUserBook(user_book_id, book_updates);

        const inProgressShelfCount = await getInProgressShelfCount();
        const inProgressShelf = await updateInProgressShelfCount(
          inProgressShelfCount
        );

        const shelfStore = useShelfStore();
        shelfStore.shelves.filter((shelf) => shelf.id !== inProgressShelf.id);
        shelfStore.shelves.push(inProgressShelf);
      } catch (error) {
        throw error;
      }
      if (updatedBook?.id) this.userBook = updatedBook;
      this.loading = false;
    },
    async uploadNewCoverImage(user_book_id, book_updates) {
      this.loading = true;
      let updatedBook;
      try {
        updatedBook = await updateUserBook(user_book_id, book_updates);
      } catch (error) {
        throw error;
      }
      if (updatedBook?.id) this.userBook = updatedBook;
      this.loading = false;
    },
    async updateUserBook(user_book_id, book_updates) {
      this.loading = true;
      let updatedBook;
      try {
        updatedBook = await updateUserBook(user_book_id, book_updates);
      } catch (error) {
        throw error;
      }
      if (updatedBook?.id) this.userBook = updatedBook;
      this.loading = false;
    },
    async removeBookFromLibrary(book_id = null) {
      this.loading = true;
      if (!book_id) {
        book_id = this.userBook.id;
      }
      try {
        await removeBookFromLibrary(book_id);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.userBook = {};
      this.loading = false;
    },
  },
});