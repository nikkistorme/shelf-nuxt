<template>
  <header id="header" class="site-header d-flex ai-center jc-between">
    <div class="left d-flex ai-center">
      <HeaderLogo />
      <HeaderDesktopNav class="desktop-only" />
    </div>
    <div class="d-flex jc-end ai-center gap-1 right">
      <HeaderProfile class="desktop-only" />
      <HeaderMobileNav class="mobile-only" />
    </div>
  </header>
</template>

<script>
export default {
  setup() {
    const user = useSupabaseUser();

    return {
      user,
    };
  },
};
</script>

<style>
.site-header {
  position: relative;
  height: var(--header-height);
  padding: 0 var(--spacing-root);
  /* border-bottom: 2px solid var(--color-grey); */
  background-color: var(--color-primary);
  border-radius: 0 0 var(--border-radius-2) var(--border-radius-2);
}
.site-header .right {
  flex: 1;
}

@media (min-width: 768px) {
  .site-header {
    padding: 0 var(--spacing-size-4);
  }
}
</style>
