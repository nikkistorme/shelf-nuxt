import { useShelfStore } from "~~/store/ShelfStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { id } = to.params;

  const shelfStore = useShelfStore();
  
  await shelfStore.fetchShelves();
  let redirectURL;
  if (to.name === "shelves") {
    await shelfStore.setActiveShelf(shelfStore.getAllBooksShelf);
    redirectURL = `/shelves/${shelfStore.activeShelf.id}`;
    console.log("🚀 ~ redirectURL", redirectURL);
    return navigateTo(redirectURL);
  } else if (id) {
    const shelf = shelfStore.getShelfById(id);
    await shelfStore.setActiveShelf(shelfStore.getAllBooksShelf);
  }
})