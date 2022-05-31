import { useBookStore } from "~~/store/BookStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const bookStore = useBookStore();
  const { id } = to.params;

  if (id) {
    await bookStore.fetchBook(id);
  }
  // TODO: if id is connected to one of the user's books, fetch that userBook too
})