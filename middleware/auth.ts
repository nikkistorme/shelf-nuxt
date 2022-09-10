import { useUserStore } from '~/store/UserStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userAuth = useSupabaseUser();
  const userStore = useUserStore();
  
  if (userAuth.value && !userStore?.profile?.id) {
    console.log('Fetching user profile');
    await userStore.fetchProfile();
  }
  if (userAuth.value && to.path === '/') {
    return navigateTo('/home');
  } else if (!userAuth.value && to.path === '/account') {
    return navigateTo('/');
  }
  // console.log("🚀 ~ userAuth4", userAuth.value);
  // console.log("🚀 ~ userStore.profile", userStore.profile);
})