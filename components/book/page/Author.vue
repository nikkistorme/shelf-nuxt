<template>
  <h2 class="book-page__author">by {{ props.book.author }}</h2>
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
@media (min-width: 768px) {
  .book-page__author {
    font-weight: normal;
  }
}
</style>
