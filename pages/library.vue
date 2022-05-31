<script>
import { useUserStore } from "../store/userStore";

export default {
  setup() {
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

<template>
  <ButtonDefault v-if="user" text="Log out" @click="logOut" />
</template>
