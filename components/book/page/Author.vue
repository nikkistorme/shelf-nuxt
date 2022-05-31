<template>
  <h3 class="book-page__author">by {{ props.book.author }}</h3>
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
.book-page__author {
  font-size: var(--font-size-1);
}
@media (min-width: 768px) {
  .book-page__author {
    font-size: var(--font-size-2);
    font-weight: normal;
  }
}
</style>
