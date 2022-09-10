import { useBookStore } from "~~/store/BookStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const bookStore = useBookStore();
  const { id } = to.params;

  if (id) {
    await bookStore.fetchBook(id);
  }
})