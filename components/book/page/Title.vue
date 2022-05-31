<template>
  <div class="book-page__title d-flex ai-center gap-1 mb-1">
    <h2>{{ props.book.title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
  },
  setup(props) {
    async function updateField() {
      console.log("🚀 ~ props.book", props.book);
    }

    return {
      props,
      updateField,
    };
  },
};
</script>

<style>
.book-page__title {
  font-size: var(--font-size-2);
}
</style>
