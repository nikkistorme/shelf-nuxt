<template>
  <p class="book-page__publishing">{{ publishedDate }} by {{ publisher }}</p>
</template>

<script>
import { formatDate } from "~/services/timeService";

export default {
  props: {
    book: Object,
  },
  setup(props) {
    const publishedDate = ref(formatDate(props.book.published));
    const publisher = ref(props.book.publisher);

    return {
      publishedDate,
      publisher,
    };
  },
};
</script>

<style>
.book-page__publishing {
  font-size: var(--font-size-small);
}
</style>
