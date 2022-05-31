<template>
  <nav class="header-nav d-flex ai-center mr-2">
    <ul class="nav-list d-flex gap-1">
      <li class="nav-list-item"><NuxtLink to="/home">Home</NuxtLink></li>
      <li v-if="userStore?.profile?.id" class="nav-list-item">
        <NuxtLink to="/library">Library</NuxtLink>
      </li>
      <li class="nav-list-item">
        <NuxtLink href="https://trello.com/b/HG9elwZ0/roadmap" target="_blank">
          Roadmap
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useUserStore } from "~~/store/userStore";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
};
</script>

<style>
@media (max-width: 767px) {
  .header-nav {
    display: none;
    visibility: none;
  }
}
.nav-list-item a {
  text-decoration: none;
  color: var(--color-black);
}
</style>
