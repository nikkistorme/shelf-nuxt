<template>
  <p class="book-page__author">{{ props.book.author }}</p>
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
  text-align: center;
}
</style>
