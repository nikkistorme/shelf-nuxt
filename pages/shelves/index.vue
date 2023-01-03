<template>
  <div class="library-page page-wrapper">
    <section class="d-flex flex-column gap-2 w-100">
      <div class="library__shelf-top d-flex gap-2">
        <ShelfTitleDropdown />
      </div>
    </section>
  </div>
</template>

<script>
import { useUserStore } from "../../store/userStore";

export default {
  setup() {
    definePageMeta({
      middleware: ["user-auth", "shelves"],
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
