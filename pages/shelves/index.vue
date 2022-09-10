<template>
  <main class="library-page page-wrapper">
    <section class="d-flex flex-column gap-2 w-100">
      <div class="library__shelf-top d-flex gap-2">
        <ShelfTitleDropdown />
        <!-- <div class="library__shelf-filters d-flex gap-1">
          <DefaultInput v-model="searchTerm" placeholder="Search..." />
          <div v-if="activeShelf?.sort" class="library__shelf-sort">
            <SelectInput
              :id="`shelf-sort__${activeShelf.id}`"
              v-model="activeShelf.sort.method"
              class="library__shelf-sort-input"
              :options="sortOptions"
              align="right"
              no-carrot
              @change="changeSortMethod"
            />
          </div>
        </div> -->
      </div>
      <!-- <p style="display: none">
        {{ pagesOnActiveShelf }} total pages on this shelf
      </p>
      <p style="display: none">
        {{ pagesReadTodayOnActiveShelf }} pages read today
      </p>
      <p style="display: none">
        {{ pagesReadThisWeekOnActiveShelf }} pages read this week
      </p>
      <div class="libary__books">
        <ShelvedBook
          v-for="(book, i) in booksOnActiveShelf"
          :key="i"
          :book="book"
          class="library__book"
          location="library"
        />
      </div> -->
    </section>
  </main>
</template>

<script>
import { useUserStore } from "../../store/userStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth", "shelves"],
    });

    const client = useSupabaseClient();
    const user = useSupabaseUser();
    const router = useRouter();
    const userStore = useUserStore();

    async function logOut() {
      userStore.setUsersLoading(true);
      await client.auth.signOut();
      router.push("/");
      userStore.setUsersLoading(false);
    }

    return {
      logOut,
      user,
    };
  },
};
</script>
