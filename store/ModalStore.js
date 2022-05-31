import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "ModalStore",
  state: () => ({
    backdrop: false,
    headerDropdown: false,
  }),
  getters: {
    showBackdrop() {
      return this.backdrop;
    },
  },
  actions: {
    openHeaderDropdown() {
      this.backdrop = true;
      this.headerDropdown = true;
    },
    closeHeaderDropdown() {
      this.headerDropdown = false;
      this.backdrop = false;
    },
    closeAllModals() {
      this.headerDropdown = false;
      this.backdrop = false;
    },
  },
});
