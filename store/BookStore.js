import { defineStore } from "pinia";
// import changeService from "~/services/changeService.js";
import { fetchUserBooks, fetchBook } from "~/services/bookService";

export const useBookStore = defineStore("BookStore", {
  state: () => ({
    books: [],
    book: {},
    loading: false,
  }),
  getters: {
    inProgressBooks() {
      return this.books.filter((book) => book.in_progress);
    },
    getBookById(id) {
      return this.books.find((book) => book.id === id);
    },
    getBooksOnShelf(shelf) {
      if (shelf.all_books_shelf) {
        return this.books;
      } else if (shelf.finished_shelf) {
        return this.books.filter((book) => book.finished);
      } else if (shelf.in_progress_shelf) {
        return this.books.filter((book) => book.inProgress);
      } else if (shelf.unread_shelf) {
        return this.books.filter((book) => !book.finished && !book.inProgress);
      } else {
        return this.books.filter((book) => book.shelves.includes(shelf.id));
      }
    },
  },
  actions: {
    async fetchBooks() {
      this.loading = true;
      try {
        const books = await fetchUserBooks();
        this.books = books;
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
    },
    async fetchBook(book_id) {
      this.loading = true;
      try {
        const book = await fetchBook(book_id);
        this.book = book;
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
    },
    // async addBookToLibrary(book) {
    //   this.loading = true;
    //   try {
    //     let newBook = bookService.newBookObject(book, state.user.uid);
    //     await bookService.addBook(newBook);
    //     this.books.push(newBook);
    //     this.loading = false;
    //     return newBook;
    //   } catch (error) {
    //     console.log("🚀 ~ error", error);
    //     throw error;
    //   }
    // },
    // async getBook(id) {
    //   this.loading = true;
    //   // await fetch("https://icy-flower-8c91.nikkistorme.workers.dev");
    //   let detailedBook = {};
    //   try {
    //     detailedBook = await bookService.getBook(id);
    //     if (!detailedBook.changes) {
    //       detailedBook.changes = [];
    //     }
    //     const shelves = state.shelves;
    //     let staleShelfIds = [];
    //     detailedBook.shelves.forEach((shelfId) => {
    //       const shelfInStore = shelves.find((s) => s.id === shelfId);
    //       if (!shelfInStore) {
    //         staleShelfIds.push(shelfId);
    //       }
    //     });
    //     if (staleShelfIds.length > 0) {
    //       console.log("🚀 ~ staleShelfIds", staleShelfIds);
    //       detailedBook.shelves = detailedBook.shelves.filter((shelfId) => {
    //         return !staleShelfIds.includes(shelfId);
    //       });
    //       await bookService.updateBookShelves(detailedBook);
    //     }
    //   } catch (error) {
    //     console.log("🚀 ~ error", error);
    //     throw error;
    //   }
    //   console.log("🚀 ~ detailedBook", detailedBook);
    //   this.books = this.books.filter((book) => book.id !== id);
    //   this.books.push(detailedBook);
    //   this.book = detailedBook;
    //   this.loading = false;
    // },
    // async updatePage(bookAndChange) {
    //   this.loading = true;
    //   try {
    //     bookAndChange.book.readPages = bookAndChange.change.payload.newValue;
    //     bookAndChange.book = changeService.addChangeToBook(
    //       bookAndChange.book,
    //       bookAndChange.change
    //     );
    //     await bookService.updatePage(bookAndChange.book);
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    //   this.books = this.books.filter(
    //     (book) => book.id !== bookAndChange.book.id
    //   );
    //   this.books.push(bookAndChange.book);
    //   this.book = bookAndChange.book;
    //   this.loading = false;
    // },
    // async setGoal(bookAndChange) {
    //   this.loading = true;
    //   try {
    //     bookAndChange.book.goal = bookAndChange.change.fields.goal;
    //     bookAndChange.book = changeService.addChangeToBook(
    //       bookAndChange.book,
    //       bookAndChange.change
    //     );
    //     await bookService.setGoal(bookAndChange.book);
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    //   this.books = this.books.filter(
    //     (book) => book.id !== bookAndChange.book.id
    //   );
    //   this.books.push(bookAndChange.book);
    //   this.book = bookAndChange.book;
    //   this.loading = true;
    // },
  },
});
