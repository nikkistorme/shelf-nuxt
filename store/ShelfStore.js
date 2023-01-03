import { defineStore } from "pinia";
import {
  createNewShelf,
  fetchShelves,
  fetchBooksForShelf,
  updateShelfSort,
  updateShelfName,
  deleteShelf,
} from "~~/services/shelfService";
import { useBookStore } from "./BookStore";

export const useShelfStore = defineStore("ShelfStore", {
  state: () => ({
    shelves: [],
    activeShelf: null,
    loading: false,
  }),
  getters: {
    inProgressShelf() {
      return this.shelves.find((shelf) => shelf.in_progress_shelf);
    },
    getAllBooksShelf() {
      return this.shelves.find((shelf) => shelf?.all_books_shelf);
    },
    getShelfById() {
      return (id) => this.shelves.find((shelf) => shelf.id === parseInt(id));
    },
    getSortedShelves() {
      const allBooks = this.shelves.find((shelf) => shelf.all_books_shelf);
      const finished = this.shelves.find((shelf) => shelf.finished_shelf);
      const inProgress = this.shelves.find((shelf) => shelf.in_progress_shelf);
      const unread = this.shelves.find((shelf) => shelf.unread_shelf);
      const sorted = this.shelves.filter(
        (shelf) =>
          !shelf.all_books_shelf &&
          !shelf.finished_shelf &&
          !shelf.in_progress_shelf &&
          !shelf.unread_shelf
      );
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      if (unread) sorted.unshift(unread);
      if (inProgress) sorted.unshift(inProgress);
      if (finished) sorted.unshift(finished);
      if (allBooks) sorted.unshift(allBooks);
      return sorted;
    },
  },
  actions: {
    async createNewShelf(name) {
      this.loading = true;
      let newShelf;
      try {
        newShelf = await createNewShelf(name);
        console.log("🚀 ~ newShelf", newShelf);
      } catch (error) {
        throw error;
      }
      this.shelves.push(newShelf);
      this.loading = false;
    },
    async fetchShelves() {
      this.loading = true;
      let shelves;
      try {
        shelves = await fetchShelves();
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.shelves = shelves;
      this.loading = false;
    },
    async setActiveShelf(shelf) {
      const bookStore = useBookStore();
      this.loading = true;
      this.activeShelf = shelf;
      let userBooks;
      try {
        userBooks = await fetchBooksForShelf(shelf);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      bookStore.userBooks = userBooks;
      this.loading = false;
    },
    async updateShelfSort(shelf) {
      this.loading = true;
      let updatedShelf;
      try {
        updatedShelf = await updateShelfSort(shelf);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.shelves = this.shelves.filter((s) => s.id !== updatedShelf.id);
      this.shelves.push(updatedShelf);
      this.loading = false;
    },
    async updateShelfName(shelf_id, newName) {
      this.loading = true;
      let updatedShelf;
      try {
        updatedShelf = await updateShelfName(shelf_id, newName);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.shelves = this.shelves.filter((s) => s.id !== updatedShelf.id);
      this.shelves.push(updatedShelf);
      if (updatedShelf?.id === this.activeShelf?.id)
        this.activeShelf = updatedShelf;
      this.loading = false;
    },
    async deleteShelf(shelf_id) {
      this.loading = true;
      try {
        await deleteShelf(shelf_id);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.shelves = this.shelves.filter((s) => s.id !== shelf_id);
      this.loading = false;
    },
  },
});
