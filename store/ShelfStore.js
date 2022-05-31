import { defineStore } from "pinia";
import {
  fetchShelves,
  fetchShelf,
  updateShelfSort,
} from "~~/services/shelfService";

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
      return this.shelves.find((shelf) => shelf.all_books_shelf);
    },
    getShelfById(id) {
      return this.shelves.find((shelf) => shelf.id === id);
    },
  },
  actions: {
    async fetchShelves() {
      this.loading = true;
      try {
        const shelves = await fetchShelves();
        this.shelves = shelves;
      } catch (error) {
        this.loading = false;
        throw error;
      }
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
    async setActiveShelf(shelf_id) {
      this.loading = true;
      try {
        const shelf = await fetchShelf(shelf_id);
        this.activeShelf = shelf;
        console.log("🚀 ~ this.activeShelf", this.activeShelf);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
    },
  },
});
