import { defineStore } from "pinia";
import {
  fetchShelves,
  fetchBooksForShelf,
  updateShelfSort,
} from "~~/services/shelfService";
import { useBookStore } from "./BookStore";

export const useShelfStore = defineStore("ShelfStore", {
  state: () => ({
    shelves: [],
    activeShelf: {},
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
      return (id) => this.shelves.find((shelf) => shelf.id === id);
    },
  },
  actions: {
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
      try {
        const updatedShelf = await updateShelfSort(shelf);
        this.shelves = this.shelves.filter((s) => s.id !== updatedShelf.id);
        this.shelves.push(updatedShelf);
      } catch (error) {
        throw error;
      }
    },
    // async setActiveShelf(shelf_id) {
    //   this.loading = true;
    //   try {
    //     const shelf = await fetchShelf(shelf_id);
    //     this.activeShelf = shelf;
    //   } catch (error) {
    //     this.loading = false;
    //     throw error;
    //   }
    //   this.loading = false;
    // },
  },
});
