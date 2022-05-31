import { defineStore } from "pinia";
import {
  signInWithPassword,
  getProfile,
  signOut,
  resetPassword,
} from "~/services/userService";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    profile: {},
    loading: false,
  }),
  actions: {
    setUsersLoading(loading) {
      this.loading = loading;
    },
    async signInWithPassword(email, password) {
      this.loading = true;
      try {
        await signInWithPassword(email, password);
        const profile = await getProfile();
        this.profile = profile;
        console.log("user profile set to:", this.profile);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
      return this.profile;
    },
    async signOut() {
      this.loading = true;
      this.profile = {};
      await signOut();
      this.loading = false;
    },
    async resetPassword(password) {
      this.loading = true;
      console.log("🚀 ~ password", password);
      await resetPassword(password);
      this.loading = false;
    },
    async fetchProfile() {
      this.loading = true;
      try {
        const profile = await getProfile();
        this.profile = profile;
        console.log("user profile set to:", this.profile);
      } catch (error) {
        this.loading = false;
        throw error;
      }
      this.loading = false;
    },
  },
});
