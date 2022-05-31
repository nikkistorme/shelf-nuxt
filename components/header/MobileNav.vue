<template>
  <div class="mobile-navigation h-100">
    <div
      class="mobile-navigation__hamburger d-flex flex-column jc-center cursor-pointer"
      @click="toggleDropdown"
    >
      <div></div>
      <div></div>
    </div>
    <div
      class="mobile-navigation__dropdown dropdown-modal-menu flex-column"
      :class="{ open: modalStore.headerDropdown }"
    >
      <div class="d-flex flex-column gap-1 p-1">
        <NuxtLink to="/home" @click="toggleDropdown">Home</NuxtLink>
        <NuxtLink to="/library" @click="toggleDropdown">Library</NuxtLink>
        <NuxtLink to="/account" @click="toggleDropdown">Account</NuxtLink>
        <NuxtLink to="https://trello.com/b/HG9elwZ0/roadmap" target="_blank">
          Roadmap
        </NuxtLink>
        <hr />
        <ButtonInline text="Sign out" @click="signOut" />
      </div>
    </div>
  </div>
</template>

<script>
import { useModalStore } from "~/store/ModalStore";
import { useUserStore } from "~/store/userStore";

export default {
  setup() {
    const modalStore = useModalStore();
    const userStore = useUserStore();

    function toggleDropdown() {
      if (modalStore.headerDropdown) {
        modalStore.closeAllModals();
      } else {
        modalStore.openHeaderDropdown();
      }
    }

    function signOut() {
      modalStore.closeAllModals();
      userStore.signOut();
    }

    return {
      modalStore,
      toggleDropdown,
      signOut,
    };
  },
};
</script>

<style>
.mobile-navigation {
  position: relative;
}
.mobile-navigation__hamburger {
  gap: 5px;
  height: 35px;
}
.mobile-navigation__hamburger > * {
  height: 3px;
  width: 25px;
  border-radius: var(--border-radius-1);
  background-color: black;
}
.mobile-navigation__dropdown {
  right: 0;
  top: 35px;
  height: 0;
  width: 200px;
}
.mobile-navigation__dropdown.open {
  height: 230px;
}
.mobile-navigation__dropdown a {
  text-decoration: none;
  color: var(--color-black);
}
</style>
